English — Text-to-Pokémon Generator (concise)

Purpose
- Minimal local full-stack: React (Vite) frontend + Express (TypeScript) backend. Frontend uses API_BASE = http://localhost:3000.

Quick facts
- Frontend dev: `npm run dev` (Vite). In Docker the dev server listens on 5173 and is published to host 8080.
- Backend dev: `npm run dev` (ts-node-dev) on port 3000.
- Storage: in-memory. Image URLs are generated via pollinations.ai.

Key endpoints
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (if OAuth env vars set)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Run (local)
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommended)
```bash
# from repository root (ex00/)
make    # builds and starts containers in background
make logs
make down
```

Environment (optional)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (defaults to `dev-secret-key` in docker-compose)

Notes
- Storage is in-memory — restart clears data.
- Pollinations.ai is used to produce image URLs; no API key in the code.

---

Français — Générateur texte → Pokémon (concis)

But
- Application minimaliste locale : frontend React (Vite) + backend Express (TypeScript). Le frontend utilise API_BASE = http://localhost:3000.

Faits rapides
- Frontend dev : `npm run dev` (Vite). Dans Docker le serveur dev écoute 5173 et est publié sur le port hôte 8080.
- Backend dev : `npm run dev` (ts-node-dev) sur le port 3000.
- Stockage : en mémoire. Les URLs d'images sont générées via pollinations.ai.

Endpoints clés
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (si variables OAuth configurées)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Lancer localement
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommandé)
```bash
# depuis la racine (ex00/)
make
make logs
make down
```

Variables d'environnement (optionnel)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (par défaut `dev-secret-key` dans docker-compose)

Remarques
- Stockage en mémoire — redémarrage efface les données.
- Pollinations.ai est utilisé pour générer les URLs d'images ; aucune clé API dans le code.
English — Text-to-Pokémon Generator (concise)

Purpose
- Minimal local full-stack: React (Vite) frontend + Express (TypeScript) backend. Frontend uses API_BASE = http://localhost:3000.

Quick facts
- Frontend dev: `npm run dev` (Vite). In Docker the dev server listens on 5173 and is published to host 8080.
- Backend dev: `npm run dev` (ts-node-dev) on port 3000.
- Storage: in-memory. Image URLs are generated via pollinations.ai.

Key endpoints
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (if OAuth env vars set)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Run (local)
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommended)
```bash
# from repository root (ex00/)
make    # builds and starts containers in background
make logs
make down
```

Environment (optional)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (defaults to `dev-secret-key` in docker-compose)

Notes
- Storage is in-memory — restart clears data.
- Pollinations.ai is used to produce image URLs; no API key in the code.

---

Français — Générateur texte → Pokémon (concis)

But
- Application minimaliste locale : frontend React (Vite) + backend Express (TypeScript). Le frontend utilise API_BASE = http://localhost:3000.

Faits rapides
- Frontend dev : `npm run dev` (Vite). Dans Docker le serveur dev écoute 5173 et est publié sur le port hôte 8080.
- Backend dev : `npm run dev` (ts-node-dev) sur le port 3000.
- Stockage : en mémoire. Les URLs d'images sont générées via pollinations.ai.

Endpoints clés
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (si variables OAuth configurées)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Lancer localement
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommandé)
```bash
# depuis la racine (ex00/)
make
make logs
make down
```

Variables d'environnement (optionnel)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (par défaut `dev-secret-key` dans docker-compose)

Remarques
- Stockage en mémoire — redémarrage efface les données.
- Pollinations.ai est utilisé pour générer les URLs d'images ; aucune clé API dans le code.
English — Text-to-Pokémon Generator (concise)

Purpose
- Minimal local full-stack: React (Vite) frontend + Express (TypeScript) backend. Frontend uses API_BASE = http://localhost:3000.

Quick facts
- Frontend dev: `npm run dev` (Vite). In Docker the dev server listens on 5173 and is published to host 8080.
- Backend dev: `npm run dev` (ts-node-dev) on port 3000.
- Storage: in-memory. Image URLs are generated via pollinations.ai.

Key endpoints
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (if OAuth env vars set)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Run (local)
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommended)
```bash
# from repository root (ex00/)
make    # builds and starts containers in background
make logs
make down
```

Environment (optional)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (defaults to `dev-secret-key` in docker-compose)

Notes
- Storage is in-memory — restart clears data.
- Pollinations.ai is used to produce image URLs; no API key in the code.
---

Français — Générateur texte → Pokémon (concis)

But
- Application minimaliste locale : frontend React (Vite) + backend Express (TypeScript). Le frontend utilise API_BASE = http://localhost:3000.

Faits rapides
- Frontend dev : `npm run dev` (Vite). Dans Docker le serveur dev écoute 5173 et est publié sur le port hôte 8080.
- Backend dev : `npm run dev` (ts-node-dev) sur le port 3000.
- Stockage : en mémoire. Les URLs d'images sont générées via pollinations.ai.

Endpoints clés
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (si variables OAuth configurées)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Lancer localement
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommandé)
```bash
# depuis la racine (ex00/)
make
make logs
make down
```

Variables d'environnement (optionnel)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (par défaut `dev-secret-key` dans docker-compose)

Remarques
- Stockage en mémoire — redémarrage efface les données.
- Pollinations.ai est utilisé pour générer les URLs d'images ; aucune clé API dans le code.
English — Text-to-Pokémon Generator (concise)

Purpose
- Minimal local full-stack: React (Vite) frontend + Express (TypeScript) backend. Frontend uses API_BASE = http://localhost:3000.

Quick facts
- Frontend dev: `npm run dev` (Vite). In Docker the dev server listens on 5173 and is published to host 8080.
- Backend dev: `npm run dev` (ts-node-dev) on port 3000.
- Storage: in-memory. Image URLs are generated via pollinations.ai.

Key endpoints
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (if OAuth env vars set)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Run (local)
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommended)
```bash
# from repository root (ex00/)
make    # builds and starts containers in background
make logs
make down
```

Environment (optional)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (defaults to `dev-secret-key` in docker-compose)

Notes
- Storage is in-memory — restart clears data.
- Pollinations.ai is used to produce image URLs; no API key in the code.

---

Français — Générateur texte → Pokémon (concis)

But
- Application minimaliste locale : frontend React (Vite) + backend Express (TypeScript). Le frontend utilise API_BASE = http://localhost:3000.

Faits rapides
- Frontend dev : `npm run dev` (Vite). Dans Docker le serveur dev écoute 5173 et est publié sur le port hôte 8080.
- Backend dev : `npm run dev` (ts-node-dev) sur le port 3000.
- Stockage : en mémoire. Les URLs d'images sont générées via pollinations.ai.

Endpoints clés
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (si variables OAuth configurées)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Lancer localement
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommandé)
```bash
# depuis la racine (ex00/)
make
make logs
make down
```

Variables d'environnement (optionnel)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (par défaut `dev-secret-key` dans docker-compose)

Remarques
- Stockage en mémoire — redémarrage efface les données.
- Pollinations.ai est utilisé pour générer les URLs d'images ; aucune clé API dans le code.
English — Text-to-Pokémon Generator (concise)

Purpose
- Minimal local full-stack: React (Vite) frontend + Express (TypeScript) backend. Frontend uses API_BASE = http://localhost:3000.

Quick facts
- Frontend dev: `npm run dev` (Vite). In Docker the dev server listens on 5173 and is published to host 8080.
- Backend dev: `npm run dev` (ts-node-dev) on port 3000.
- Storage: in-memory. Image URLs are generated via pollinations.ai.

Key endpoints
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (if OAuth env vars set)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Run (local)
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommended)
```bash
# from repository root (ex00/)
make    # builds and starts containers in background
make logs
make down
```

Environment (optional)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (defaults to `dev-secret-key` in docker-compose)

Notes
- Storage is in-memory — restart clears data.
- Pollinations.ai is used to produce image URLs; no API key in the code.

---

Français — Générateur texte → Pokémon (concis)

But
- Application minimaliste locale : frontend React (Vite) + backend Express (TypeScript). Le frontend utilise API_BASE = http://localhost:3000.

Faits rapides
- Frontend dev : `npm run dev` (Vite). Dans Docker le serveur dev écoute 5173 et est publié sur le port hôte 8080.
- Backend dev : `npm run dev` (ts-node-dev) sur le port 3000.
- Stockage : en mémoire. Les URLs d'images sont générées via pollinations.ai.

Endpoints clés
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (si variables OAuth configurées)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Lancer localement
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommandé)
```bash
# depuis la racine (ex00/)
make
make logs
make down
```

Variables d'environnement (optionnel)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (par défaut `dev-secret-key` dans docker-compose)

Remarques
- Stockage en mémoire — redémarrage efface les données.
- Pollinations.ai est utilisé pour générer les URLs d'images ; aucune clé API dans le code.
# Text to Pokémon Generator - ex01

Application web minimaliste de génération de Pokémon par IA, suivant strictement les exigences du projet.

## 📋 Conformité au Sujet

### ✅ Technologies Requises (Strictement Respectées)
- ✅ **Docker** + **docker-compose.yml** + **Dockerfile**
- ✅ **TypeScript** pour backend et frontend
- ✅ **React 18** pour l'interface
- ✅ **Vite** pour le build
- ✅ **TailwindCSS** pour le styling

### ✅ Fonctionnalités Obligatoires
- ✅ **Authentification OAuth2** avec Google
- ✅ **Génération d'images AI** via API externe (Pollinations.ai)
- ✅ **SPA (Single-Page Application)** - Une seule page
- ✅ **Mobile-first** approach avec design responsive
- ✅ **Accessibilité WCAG 2.1 AA** (semantic HTML, ARIA, keyboard nav)
- ✅ **Sécurité** : JWT tokens, HttpOnly cookies, sessions sécurisées
- ✅ **Backend minimal** pour gérer OAuth2 et API

### 🎯 Design Inspiré du pokedex de Pokemon Arceus
Interface simple avec :
- Formulaire de génération (prompt texte)
- Affichage du résultat généré
- Collection des créations de l'utilisateur
- Design épuré et professionnel

## 🚀 Installation Rapide

### Prérequis
- Docker et Docker Compose
- Make (optionnel, mais recommandé)
- Compte Google Cloud Platform (pour OAuth2) - **OPTIONNEL** si vous utilisez le mode demo

### 1. Configuration OAuth2 Google (OPTIONNEL)

> **💡 Note** : Vous pouvez sauter cette étape et utiliser le **mode demo** pour tester l'application immédiatement !

#### Créer les identifiants (si vous voulez OAuth2) :
1. Allez sur https://console.cloud.google.com/
2. Créez un projet
3. Activez l'API "Google+ API"
4. Créez des identifiants OAuth 2.0 :
   - **Type** : Application Web
   - **Authorized JavaScript origins** : `http://localhost:8080`
   - **Authorized redirect URIs** : `http://localhost:3000/auth/google/callback`

### 2. Configuration des Variables d'Environnement

```bash
cd ex01/
cp .env.example .env
English — Text-to-Pokémon Generator (concise)

Purpose
- Minimal local full-stack app: React (Vite) frontend + Express (TypeScript) backend. Frontend uses `API_BASE = http://localhost:3000`.

Quick facts
- Frontend dev: `npm run dev` (Vite). Inside Docker the dev server listens on 5173 and is published to host 8080.
- Backend dev: `npm run dev` (ts-node-dev) on port 3000.
- Storage: in-memory. Image URLs built using pollinations.ai.

Key endpoints
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (if GOOGLE_CLIENT_ID/SECRET set)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Run (local)
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommended)
```bash
# from repository root (ex00/)
make
make logs
make down
```

English — Text-to-Pokémon Generator (concise)

Purpose
- Minimal local full-stack app: React (Vite) frontend + Express (TypeScript) backend. Frontend uses `API_BASE = http://localhost:3000`.

Quick facts
- Frontend dev: `npm run dev` (Vite). Inside Docker the dev server listens on 5173 and is published to host 8080.
- Backend dev: `npm run dev` (ts-node-dev) on port 3000.
- Storage: in-memory. Image URLs built using pollinations.ai.

Key endpoints
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (if GOOGLE_CLIENT_ID/SECRET set)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Run (local)
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommended)
```bash
# from repository root (ex00/)
make
make logs
make down
```

Environment (optional)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (defaults to `dev-secret-key` in docker-compose)

Notes
- Storage is in-memory — restart clears data.
- Pollinations.ai used to produce image URLs; no API key required in code.

---

Français — Générateur texte → Pokémon (concis)

But
- Application minimaliste locale : frontend React (Vite) + backend Express (TypeScript). Le frontend utilise `API_BASE = http://localhost:3000`.

Faits rapides
- Frontend dev : `npm run dev` (Vite). Dans Docker le serveur dev écoute 5173 et est exposé sur le port 8080.
- Backend dev : `npm run dev` (ts-node-dev) sur le port 3000.
- Stockage : en mémoire. Les URL d'images sont construites via pollinations.ai.

Endpoints clés
- GET /health
- GET /options
- POST /auth/demo  { username }
- GET /auth/me
- POST /auth/logout
- GET /auth/google, GET /auth/google/callback (si variables OAuth configurées)
- POST /generate-image  { prompt, animals?, abilities? }
- GET /pokemons
- DELETE /pokemons/:id
- POST /share  { pokemonId }
- GET /share/:shareId

Lancer localement
1) npm (dev)
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

2) Docker Compose (recommandé)
```bash
# depuis la racine (ex00/)
make
make logs
make down
```

Variables d'environnement (optionnel)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL
- SESSION_SECRET (par défaut `dev-secret-key` dans docker-compose)

Remarques
- Stockage en mémoire — redémarrage efface les données.
- Pollinations.ai est utilisé pour générer les URLs d'images ; aucune clé API dans le code.
