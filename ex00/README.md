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
```

Éditez `.env` avec vos identifiants :
```env
SESSION_SECRET=votre-secret-securise
GOOGLE_CLIENT_ID=votre-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

## 📖 Utilisation

### Démarrage Rapide

```bash
# 1. Copier et configurer les variables d'environnement
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

## 📱 Mobile-First

- Design responsive avec breakpoints Tailwind
- Grid adaptatif (1 colonne mobile, 2 colonnes desktop)
- Touch-friendly buttons et interactions
- Images optimisées avec lazy loading


## 👥 Auteur

Projet réalisé dans le cadre de la Piscine Globant - Project 3 par ampocchi

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
