# TixTrack Frontend

Application frontend de gestion de tickets construite avec Next.js 16, TypeScript et React 19.

## Technologies utilisées

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript 5
- **UI**: React 19.2.0
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **State Management**: TanStack Query 5.90.7
- **Forms**: TanStack Form 1.23.8
- **Tables**: TanStack Table 8.21.3
- **HTTP Client**: Axios 1.13.2
- **Validation**: Zod 4.1.12
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Theme**: next-themes

## Génération du client API

Le projet utilise [Orval](https://orval.dev/) pour générer automatiquement le client API à partir du Swagger de l'API backend (NestJS).

Configuration dans [orval.config.ts](orval.config.ts):
- Endpoint Swagger: `http://localhost:3000/doc-json`
- Output: `api/endpoints/` (organisé par tags)
- Client: react-query hooks
- Custom instance: [api/client.ts](api/client.ts)

## Prérequis

- Node.js 20+
- pnpm (recommandé)
- Backend TixTrack en cours d'exécution sur `http://localhost:3000`

## Installation

```bash
pnpm install
```

## Développement

Le serveur de développement démarre sur le port 3100 et génère automatiquement le client API avant de démarrer :

```bash
pnpm dev
```

L'application sera accessible sur [http://localhost:3100](http://localhost:3100)

### Générer uniquement le client API

```bash
pnpm generate:api
```

## Structure du projet

```
tixtrack-front/
├── app/                      # App Router Next.js
│   ├── (protected)/         # Routes protégées
│   │   ├── admin/          # Page d'administration (Services & Sujets)
│   │   └── dashboard/      # Dashboard
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Page d'accueil
├── api/                     # Client API généré par Orval
│   ├── client.ts           # Instance Axios personnalisée
│   └── endpoints/          # Hooks react-query par tag
│       ├── service/
│       ├── subject/
│       ├── ticket/
│       └── ...
├── components/              # Composants réutilisables
│   └── ui/                 # Composants UI (shadcn/ui)
├── hooks/                   # Hooks personnalisés
├── lib/                     # Utilitaires
└── providers/               # Providers React (Query, Theme, etc.)
```

## Fonctionnalités

- Gestion des Services (TanStack Table + Dialog)
- Gestion des Sujets (TanStack Table + Form validation)
- Validation de formulaires avec TanStack Form et Zod
- Tables interactives avec TanStack Table
- Client API type-safe généré automatiquement
- Server-side rendering et data prefetching
- Mode sombre (next-themes)
- Notifications toast (Sonner)

## Scripts disponibles

- `pnpm dev` - Démarre le serveur de développement (port 3100)
- `pnpm build` - Build de production
- `pnpm start` - Démarre le serveur de production
- `pnpm lint` - Linter ESLint
- `pnpm generate:api` - Génère le client API depuis le Swagger

## Build de production

```bash
pnpm build
pnpm start
```
