import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3000';

interface User {
  id: number;
  username: string;
  email: string;
}

interface Pokemon {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
  animals?: string[];
  abilities?: string[];
}

// Component with retry logic for images
function PokemonImage({ src, alt, className, onLoadComplete }: { src: string; alt: string; className?: string; onLoadComplete?: () => void }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const maxRetries = 3;

  const handleError = () => {
    if (retryCount < maxRetries) {
      // Add a timestamp to force reload
      const separator = imgSrc.includes('?') ? '&' : '?';
      setImgSrc(`${src}${separator}retry=${retryCount + 1}&t=${Date.now()}`);
      setRetryCount(prev => prev + 1);
    } else {
      setIsLoading(false);
      onLoadComplete?.();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoadComplete?.();
  };

  return (
    <div className={`relative overflow-hidden min-h-[96px] ${className ?? ''}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-arceus-blue-darker/70">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              {/* Pokéball */}
              <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#000000" strokeWidth="2"/>
              <path d="M 5 50 A 45 45 0 0 1 95 50" fill="#e53935" stroke="#000000" strokeWidth="2"/>
              <line x1="5" y1="50" x2="95" y2="50" stroke="#000000" strokeWidth="3"/>
              <circle cx="50" cy="50" r="12" fill="#ffffff" stroke="#000000" strokeWidth="3"/>
              <circle cx="50" cy="50" r="6" fill="#ffffff" stroke="#000000" strokeWidth="2"/>
            </svg>
            {retryCount > 0 && <p className="text-xs text-arceus-gold">Tentative {retryCount}/{maxRetries}</p>}
          </div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full block ${className ?? ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedPokemon, setGeneratedPokemon] = useState<Pokemon | null>(null);
  const [myPokemons, setMyPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Options from backend
  const [availableAnimals, setAvailableAnimals] = useState<string[]>([]);
  const [availableAbilities, setAvailableAbilities] = useState<string[]>([]);

  // Selected options
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);

  // Share
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Demo login
  const [demoUsername, setDemoUsername] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Check authentication
  useEffect(() => {
    checkAuth();
  }, []);

  // Load user's pokemon collection
  useEffect(() => {
    if (user) {
      loadPokemons();
      loadOptions();
    }
  }, [user]);

  async function loadOptions() {
    try {
      const res = await fetch(`${API_BASE}/options`);
      if (res.ok) {
        const data = await res.json();
        setAvailableAnimals(data.animals);
        setAvailableAbilities(data.abilities);
      }
    } catch (e) {
      console.error('Failed to load options:', e);
    }
  }

  async function checkAuth() {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (e) {
      console.error('Auth check failed:', e);
    } finally {
      setLoading(false);
    }
  }

  async function loadPokemons() {
    try {
      const res = await fetch(`${API_BASE}/pokemons`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setMyPokemons(data);
      }
    } catch (e) {
      console.error('Failed to load pokemons:', e);
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a description');
      return;
    }

    setError(null);
    setGenerating(true);
    setGeneratedPokemon(null);

    try {
      const res = await fetch(`${API_BASE}/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          prompt: prompt.trim(),
          animals: selectedAnimals,
          abilities: selectedAbilities
        }),
      });

      if (!res.ok) {
        throw new Error('Generation failed');
      }

      const pokemon = await res.json();
      setGeneratedPokemon(pokemon);
      setMyPokemons([pokemon, ...myPokemons]);
      setPrompt('');
      setSelectedAnimals([]);
      setSelectedAbilities([]);
    } catch (e) {
      setError((e as Error).message || 'Failed to generate Pokémon');
    } finally {
      setGenerating(false);
    }
  }

  async function handleShare(pokemonId: string) {
    try {
      const res = await fetch(`${API_BASE}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ pokemonId }),
      });

      if (!res.ok) {
        throw new Error('Share failed');
      }

      const data = await res.json();
      setShareUrl(data.shareUrl);
      setShowShareModal(true);
    } catch (e) {
      setError((e as Error).message || 'Failed to share Pokémon');
    }
  }

  function toggleAnimal(animal: string) {
    setSelectedAnimals(prev =>
      prev.includes(animal)
        ? prev.filter(a => a !== animal)
        : [...prev, animal]
    );
  }

  function toggleAbility(ability: string) {
    setSelectedAbilities(prev =>
      prev.includes(ability)
        ? prev.filter(a => a !== ability)
        : [...prev, ability]
    );
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`${API_BASE}/pokemons/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setMyPokemons(myPokemons.filter(p => p.id !== id));
        if (generatedPokemon?.id === id) {
          setGeneratedPokemon(null);
        }
      }
    } catch (e) {
      console.error('Delete failed:', e);
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      setMyPokemons([]);
      setGeneratedPokemon(null);
    } catch (e) {
      console.error('Logout failed:', e);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-700" role="status" aria-live="polite">
          Loading...
        </div>
      </div>
    );
  }

  // Login screen
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-radial from-arceus-light via-arceus-dark to-arceus-darker flex items-center justify-center p-4 sm:p-6 md:p-10">
        <main className="relative flex items-center w-full max-w-[800px]">
          {/* Rectangle marron/noir derrière le noeud */}
          <div aria-hidden="true" className="hidden sm:block absolute left-0 w-[60px] sm:w-[84px] h-full bg-gradient-to-r from-[#3a2c1a] via-[#5a4a3a] to-[#3a2c1a] rounded-l-[20px] z-[1] shadow-[inset_2px_0_5px_rgba(0,0,0,0.3)]"></div>

          {/* Ruban/noeud image à gauche */}
          <img
            src="/noeud.png"
            alt="Noeud décoratif du Pokédex"
            aria-hidden="true"
            className="hidden sm:block w-[80px] sm:w-[100px] md:w-[120px] h-[144px] sm:h-[180px] md:h-[216px] -ml-[30px] sm:-ml-[35px] md:-ml-[42px] z-[2] drop-shadow-[4px_6px_12px_rgba(0,0,0,0.3)] flex-shrink-0 self-center"
          />

          {/* Carnet de connexion */}
          <section className="relative bg-gradient-to-br from-arceus-blue to-arceus-blue-dark rounded-[20px] sm:rounded-r-[32px] p-6 sm:p-8 md:p-12 w-full sm:min-w-[500px] md:min-w-[600px] min-h-[400px] sm:min-h-[500px] shadow-[0_20px_60px_rgba(0,0,0,0.4),inset_0_0_0_2px_rgba(255,255,255,0.08)] flex flex-col items-center justify-center">

            <div className="mb-6 sm:mb-8">
              <img
                src="/etiquette-pokemon.png"
                alt="Logo Pokémon - Text to Pokémon Generator"
                className="w-[200px] sm:w-[240px] md:w-[280px] h-auto drop-shadow-[2px_3px_6px_rgba(0,0,0,0.15)]"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-arceus-gold mb-2 text-center uppercase tracking-wider">
              Générateur de Pokémon
            </h1>
            <p className="text-gray-300 text-center mb-8">
              Créez vos propres Pokémon avec l'IA
            </p>

            {error && (
              <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-4 mb-6 w-full max-w-md" role="alert">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            <div className="w-full max-w-md space-y-4">
              {/* Google OAuth */}
              <a
                href={`${API_BASE}/auth/google`}
                className="flex items-center justify-center gap-3 w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 border-2 border-gray-300 rounded-xl transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-arceus-gold/50"
                aria-label="Se connecter avec Google"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Se connecter avec Google
              </a>

              {/* Séparateur */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-400/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-arceus-blue text-gray-300">ou</span>
                </div>
              </div>

              {/* Demo Login */}
              <form onSubmit={async (e) => {
                e.preventDefault();
                if (!demoUsername.trim() || demoUsername.length < 2) {
                  setError('Le nom doit contenir au moins 2 caractères');
                  return;
                }
                setLoggingIn(true);
                setError(null);
                try {
                  const res = await fetch(`${API_BASE}/auth/demo`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ username: demoUsername })
                  });
                  if (!res.ok) throw new Error('Login demo échoué');
                  const userData = await res.json();
                  setUser(userData);
                } catch (err) {
                  setError('Erreur lors de la connexion demo');
                } finally {
                  setLoggingIn(false);
                }
              }} className="space-y-3">
                <input
                  type="text"
                  placeholder="Nom d'utilisateur (demo)"
                  value={demoUsername}
                  onChange={(e) => setDemoUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-arceus-blue-darker/50 border-2 border-arceus-gold/30 rounded-lg text-gray-200 placeholder-gray-400 focus:border-arceus-gold focus:outline-none focus:ring-2 focus:ring-arceus-gold/50"
                  disabled={loggingIn}
                  minLength={2}
                />
                <button
                  type="submit"
                  disabled={loggingIn || !demoUsername.trim()}
                  className="w-full bg-arceus-gold/80 hover:bg-arceus-gold text-arceus-blue-darker font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-arceus-gold/50 uppercase tracking-wide"
                >
                  {loggingIn ? 'Connexion...' : 'Connexion Demo'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Mode test sans OAuth2
                </p>
              </form>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6 uppercase tracking-wide">
              Compte Google ou mode demo
            </p>
          </section>
        </main>
      </div>
    );
  }

  // Main application (logged in)
  return (
    <div className="min-h-screen bg-gradient-radial from-arceus-light via-arceus-dark to-arceus-darker">
      {/* Header */}
      <header className="bg-gradient-to-r from-arceus-blue-darker via-arceus-blue-dark to-arceus-blue-darker shadow-lg border-b-2 border-arceus-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-arceus-gold uppercase tracking-wider">
              Générateur Pokémon
            </h1>
            <p className="text-sm text-gray-300 mt-1">
              Powered by AI • Bienvenue, {user.username}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/50 uppercase tracking-wide text-sm"
            aria-label="Logout"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Generator */}
          <section aria-labelledby="generator-heading" className="bg-gradient-to-br from-arceus-blue to-arceus-blue-dark rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-arceus-gold/20">
            <h2 id="generator-heading" className="text-2xl font-bold text-arceus-gold mb-6 uppercase tracking-wider">
              Créer un Pokémon
            </h2>

            <form onSubmit={handleGenerate} className="space-y-6" aria-label="Pokemon generation form">
              <div>
                <label htmlFor="prompt-input" className="block text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wide">
                  Décrivez votre Pokémon
                </label>
                <textarea
                  id="prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="ex: Un dragon cracheur de feu aux écailles bleues..."
                  className="w-full px-4 py-3 bg-arceus-blue-darker/50 border-2 border-arceus-gold/30 rounded-lg focus:border-arceus-gold focus:outline-none focus:ring-2 focus:ring-arceus-gold/50 transition-colors resize-none text-gray-200 placeholder-gray-400"
                  rows={4}
                  disabled={generating}
                  aria-required="true"
                  aria-describedby="prompt-helper"
                />
                <p id="prompt-helper" className="text-xs text-gray-500 mt-2">
                  Describe appearance, type, or abilities. Be creative!
                </p>
              </div>

              {/* Animal Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wide">
                  Animaux (optionnel, max 3)
                </label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border-2 border-arceus-gold/30 rounded-lg bg-arceus-blue-darker/50">
                  {availableAnimals.map((animal) => (
                    <button
                      key={animal}
                      type="button"
                      onClick={() => toggleAnimal(animal)}
                      disabled={!selectedAnimals.includes(animal) && selectedAnimals.length >= 3}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        selectedAnimals.includes(animal)
                          ? 'bg-arceus-gold text-arceus-blue-darker hover:bg-arceus-gold-dark'
                          : 'bg-arceus-blue-darker/70 text-gray-300 hover:bg-arceus-blue-darker border border-arceus-gold/20'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      aria-pressed={selectedAnimals.includes(animal)}
                    >
                      {animal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ability Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wide">
                  Capacités (optionnel, max 4)
                </label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border-2 border-arceus-gold/30 rounded-lg bg-arceus-blue-darker/50">
                  {availableAbilities.map((ability) => (
                    <button
                      key={ability}
                      type="button"
                      onClick={() => toggleAbility(ability)}
                      disabled={!selectedAbilities.includes(ability) && selectedAbilities.length >= 4}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        selectedAbilities.includes(ability)
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-arceus-blue-darker/70 text-gray-300 hover:bg-arceus-blue-darker border border-purple-400/30'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      aria-pressed={selectedAbilities.includes(ability)}
                    >
                      {ability}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border-2 border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={generating || !prompt.trim()}
                className="w-full bg-arceus-gold hover:bg-arceus-gold-dark text-arceus-blue-darker font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-arceus-gold/50 uppercase tracking-wider"
                aria-busy={generating}
              >
                {generating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Génération...
                  </span>
                ) : (
                  'Générer Pokémon'
                )}
              </button>
            </form>

            {/* Generated result */}
            {generatedPokemon && (
              <div className="mt-8 border-t-2 border-arceus-gold/30 pt-8">
                <h3 className="text-xl font-bold text-arceus-gold mb-4 uppercase tracking-wide">Résultat</h3>
                <div className="bg-arceus-blue-darker/50 border-2 border-arceus-gold/20 rounded-xl p-4">
                  <PokemonImage
                    src={generatedPokemon.imageUrl}
                    alt={`Generated Pokémon: ${generatedPokemon.prompt}`}
                    className="w-full h-auto rounded-lg shadow-lg mb-3"
                  />
                  <p className="text-sm text-gray-200 font-medium">
                    "{generatedPokemon.prompt}"
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Généré {new Date(generatedPokemon.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Right: Collection */}
          <section aria-labelledby="collection-heading" className="bg-gradient-to-br from-arceus-blue to-arceus-blue-dark rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-arceus-gold/20">
            <h2 id="collection-heading" className="text-2xl font-bold text-arceus-gold mb-6 uppercase tracking-wider">
              Ma Collection ({myPokemons.length})
            </h2>

            {myPokemons.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <svg className="w-24 h-24 mx-auto mb-4 text-arceus-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-lg font-medium">Aucun Pokémon</p>
                <p className="text-sm mt-2">Générez votre premier Pokémon pour commencer !</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
                {myPokemons.map((pokemon) => (
                  <article
                    key={pokemon.id}
                    className="bg-arceus-blue-darker/50 border-2 border-arceus-gold/20 rounded-lg p-3 shadow-md hover:shadow-xl hover:border-arceus-gold/40 transition-all"
                  >
                    <PokemonImage
                      src={pokemon.imageUrl}
                      alt={`Pokémon: ${pokemon.prompt}`}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <p className="text-sm text-gray-200 font-medium line-clamp-2 mb-2">
                      "{pokemon.prompt}"
                    </p>
                    {pokemon.animals && pokemon.animals.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {pokemon.animals.map((animal) => (
                          <span key={animal} className="px-2 py-0.5 bg-arceus-gold/20 text-arceus-gold text-xs rounded-full border border-arceus-gold/30">
                            {animal}
                          </span>
                        ))}
                      </div>
                    )}
                    {pokemon.abilities && pokemon.abilities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {pokemon.abilities.map((ability) => (
                          <span key={ability} className="px-2 py-0.5 bg-purple-600/30 text-purple-300 text-xs rounded-full border border-purple-500/30">
                            {ability}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {new Date(pokemon.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShare(pokemon.id)}
                          className="text-arceus-gold hover:text-arceus-gold-dark text-sm font-medium focus:outline-none focus:ring-2 focus:ring-arceus-gold/50 rounded px-2 py-1 transition-colors"
                          aria-label={`Share Pokémon: ${pokemon.prompt}`}
                        >
                          Partager
                        </button>
                        <button
                          onClick={() => handleDelete(pokemon.id)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded px-2 py-1 transition-colors"
                          aria-label={`Delete Pokémon: ${pokemon.prompt}`}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && shareUrl && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-gradient-to-br from-arceus-blue to-arceus-blue-dark border-2 border-arceus-gold/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-arceus-gold mb-4 uppercase tracking-wider">
              Partager votre Pokémon
            </h3>
            <p className="text-gray-300 mb-4">
              Copiez ce lien pour partager votre Pokémon :
            </p>
            <div className="bg-arceus-blue-darker/50 border-2 border-arceus-gold/30 p-3 rounded-lg mb-4 flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-200 outline-none"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('Lien copié !');
                }}
                className="bg-arceus-gold hover:bg-arceus-gold-dark text-arceus-blue-darker px-4 py-2 rounded-lg text-sm font-medium transition-colors uppercase tracking-wide"
              >
                Copier
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full bg-arceus-blue-darker/70 hover:bg-arceus-blue-darker border border-arceus-gold/30 text-gray-200 px-4 py-2 rounded-lg font-medium transition-colors uppercase tracking-wide"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-600">
          <p>Powered by <a href="https://pollinations.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Pollinations.ai</a></p>
          <p className="mt-2">TypeScript • React • Vite • TailwindCSS • OAuth2</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
