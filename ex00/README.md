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

### 🎯 Design Inspiré de text-to-pokemon (Replicate)
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
```

Éditez `.env` avec vos identifiants :
```env
SESSION_SECRET=votre-secret-securise
GOOGLE_CLIENT_ID=votre-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

### 3. Démarrage avec Make (Recommandé ✨)

```bash
# Démarrer l'application
make

# Voir les logs
make logs

# Arrêter
make down

# Redémarrer
make restart

# Reconstruire
make re
```

**Accès :**
- Frontend : http://localhost:8080
- Backend API : http://localhost:3000

### 3bis. Démarrage avec Docker Compose (Manuel)

```bash
# Build et démarrage
docker-compose up --build

# En arrière-plan
docker-compose up -d --build

# Arrêter
docker-compose down
```

## 📋 Commandes Make Disponibles

| Commande | Description |
|----------|-------------|
| `make` ou `make up` | Démarre l'application |
| `make down` | Arrête l'application |
| `make restart` | Redémarre les conteneurs |
| `make logs` | Affiche les logs en temps réel |
| `make clean` | Arrête et supprime les conteneurs + volumes |
| `make re` | Reconstruit tout de zéro |

## 📖 Utilisation

### Démarrage Rapide

```bash
# 1. Copier et configurer les variables d'environnement (OPTIONNEL pour mode demo)
cp .env.example .env
# Éditer .env avec vos credentials Google (si vous voulez OAuth2)

# 2. Démarrer l'application
make

# 3. Accéder à l'application
# Frontend: http://localhost:8080
# Backend: http://localhost:3000

# 4. Voir les logs
make logs

# 5. Arrêter quand vous avez fini
make down
```

### 🎮 Modes de Connexion

#### Mode Demo (Sans Configuration)
Pour tester rapidement sans configurer Google OAuth2 :
1. Accédez à http://localhost:8080
2. Entrez n'importe quel nom d'utilisateur (min 2 caractères)
3. Cliquez sur "Connexion Demo"
4. Commencez à générer des Pokémon !

**Avantages :**
- ✅ Aucune configuration OAuth2 nécessaire
- ✅ Parfait pour les tests et démonstrations
- ✅ Idéal pour les utilisateurs externes
- ✅ Données séparées par utilisateur demo

#### Mode OAuth2 Google (Production)
Pour une vraie authentification :
1. Configurez vos credentials Google (voir section OAuth2 ci-dessus)
2. Cliquez sur "Se connecter avec Google"
3. Autorisez l'application

### Workflow Utilisateur

1. **Connexion** :
   - **Demo** : Entrez un nom d'utilisateur
   - **Google** : Cliquez sur "Sign in with Google"
2. **Génération** :
   - Entrez une description textuelle (ex: "A fire-breathing dragon with blue scales")
   - Cliquez sur "Generate Pokémon"
   - L'image est générée par IA en quelques secondes
3. **Collection** :
   - Vos créations sont sauvegardées automatiquement
   - Visualisez toute votre collection
   - Supprimez les créations si nécessaire
4. **Déconnexion** : Bouton "Logout" en haut à droite

## 🏗️ Architecture

```
ex01/
├── backend/
│   ├── src/
│   │   └── server.ts          # API Express + OAuth2 + Passport
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # Application principale (page unique)
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── tsconfig.json
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## 🔧 Stack Technique

### Backend
- **Node.js 20** avec Express
- **TypeScript** pour la sécurité des types
- **Passport.js** pour OAuth2
- **JWT** pour les sessions
- **express-session** pour la gestion des sessions
- Stockage en mémoire (minimal, comme demandé)

### Frontend
- **React 18** avec hooks
- **TypeScript**
- **Vite** pour un build ultra-rapide
- **TailwindCSS** pour le styling
- **Responsive design** mobile-first

### Infrastructure
- **Docker** pour la conteneurisation
- **Docker Compose** pour l'orchestration
- **Pollinations.ai** pour la génération d'images IA

## 🔒 Sécurité

- ✅ OAuth2 avec Google (authentification sécurisée)
- ✅ JWT tokens dans cookies HttpOnly
- ✅ CORS configuré
- ✅ Sessions sécurisées avec express-session
- ✅ Variables d'environnement pour secrets
- ✅ Pas de credentials dans le code

## ♿ Accessibilité (WCAG 2.1 AA)

- ✅ HTML sémantique (`<main>`, `<header>`, `<section>`, `<article>`, `<footer>`)
- ✅ ARIA labels et rôles
- ✅ Navigation clavier complète
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Alt texts descriptifs sur les images
- ✅ États de chargement annoncés (aria-busy, role="status")
- ✅ Messages d'erreur avec role="alert"

## 📱 Mobile-First

- Design responsive avec breakpoints Tailwind
- Grid adaptatif (1 colonne mobile, 2 colonnes desktop)
- Touch-friendly buttons et interactions
- Images optimisées avec lazy loading

## 🎨 Interface

### Page de Login
- Bouton "Sign in with Google" avec logo officiel
- Design épuré et centré
- Messages d'erreur clairs

### Page Principale (Logged In)
**Layout 2 colonnes (responsive) :**

**Colonne Gauche - Générateur :**
- Textarea pour la description
- Bouton "Generate Pokémon"
- Affichage du résultat généré
- État de chargement avec spinner

**Colonne Droite - Collection :**
- Grille de toutes les créations
- Preview image + description
- Bouton delete sur chaque carte
- Scroll si nombreuses créations

**Header :**
- Titre de l'application
- Nom d'utilisateur
- Bouton Logout

**Footer :**
- Crédit Pollinations.ai
- Technologies utilisées

## 📡 API Endpoints

### Authentification
- `GET /auth/google` - Initier OAuth2
- `GET /auth/google/callback` - Callback OAuth2
- `GET /auth/me` - Obtenir l'utilisateur courant
- `POST /auth/logout` - Déconnexion

### Pokémon
- `POST /generate-image` - Générer un Pokémon (auth requise)
- `GET /pokemons` - Liste des Pokémon de l'utilisateur (auth requise)
- `DELETE /pokemons/:id` - Supprimer un Pokémon (auth requise)

### Health
- `GET /health` - Health check

## 💡 Exemples d'Utilisation

```bash
# Démarrer
make

# Voir les logs
make logs

# Arrêter
make down

# Reconstruire
make re
```

## 🐛 Dépannage

### OAuth2 ne fonctionne pas
```bash
# Vérifier les variables d'environnement
cat .env

# Vérifier que les URIs correspondent exactement dans Google Console
# http://localhost:3000/auth/google/callback (pas de / à la fin)

# Redémarrer les conteneurs
docker-compose down
docker-compose up --build
```

### Erreur CORS
```bash
# Le frontend doit accéder au backend via localhost
# Vérifier que les ports sont corrects : 8080 (frontend) et 3000 (backend)
```

### Images ne se génèrent pas
```bash
# Vérifier la connexion internet (Pollinations.ai est une API externe)
# Vérifier les logs backend : docker-compose logs backend
```

### Conteneurs ne démarrent pas
```bash
# Nettoyer tout et reconstruire
docker-compose down -v
docker system prune -f
docker-compose up --build
```

## 🔍 Différences avec ex00

**ex01 (cette version) :**
- ✅ Page unique (plus simple)
- ✅ Focus sur la génération par prompt texte
- ✅ Interface inspirée de text-to-pokemon (Replicate)
- ✅ Code minimal et épuré
- ✅ Strictement conforme aux exigences

**ex00 (version complète) :**
- Multi-pages avec router
- Profil utilisateur, Pokédex, partage via URL
- Intégration PokeAPI
- Plus de fonctionnalités

## 📊 Conformité Projet

| Exigence | Status | Implémentation |
|----------|--------|----------------|
| Docker | ✅ | docker-compose.yml + Dockerfiles |
| TypeScript | ✅ | Backend + Frontend |
| React | ✅ | React 18 avec hooks |
| Vite | ✅ | Build tool |
| TailwindCSS | ✅ | Styling complet |
| OAuth2 | ✅ | Google via Passport.js |
| AI Images | ✅ | Pollinations.ai |
| SPA | ✅ | Single page app |
| Mobile-first | ✅ | Responsive design |
| Accessibilité | ✅ | WCAG 2.1 AA |
| Sécurité | ✅ | JWT, cookies, sessions |
| Backend minimal | ✅ | Express minimal |

## 👥 Auteur

Projet réalisé dans le cadre de la Piscine Globant - Project 3

## 📝 Notes

- **Production** : Changez les URIs OAuth2 pour votre domaine HTTPS
- **Secrets** : Ne commitez jamais le fichier `.env`
- **API** : Pollinations.ai est gratuit et ne nécessite pas de clé API
- **Stockage** : Actuellement en mémoire (se réinitialise au redémarrage)

## 🔗 Ressources

- [Google OAuth2 Docs](https://developers.google.com/identity/protocols/oauth2)
- [Pollinations.ai](https://pollinations.ai/)
- [Text-to-Pokemon Model](https://replicate.com/lambdal/text-to-pokemon)
- [React Documentation](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
