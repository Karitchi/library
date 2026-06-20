# Librarian

Démo interactive d'une application de gestion de bibliothèque, construite avec **Java Spring Boot** et **React Router**.

> Ce projet est un **projet d'apprentissage personnel** — il sert de terrain de jeu pour explorer Spring Boot 4, React Router v7, Docker, et l'intégration avec des assistants IA dans le développement web.

---

## Fonctionnalités

- Inscription / Connexion avec JWT (rôles `user` et `librarian`)
- Catalogue de 55 livres avec couvertures (via Open Library API)
- Emprunt et retour de livres
- Vue bibliothécaire : liste de tous les emprunts, retour possible
- Interface noir & blanc, sans arrondis, en français
- Toasts de notifications (sonner)

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React 19, React Router v7 (SSR, file-based routing), Vite 8, Tailwind CSS v4, TypeScript |
| Backend | Java 25, Spring Boot 4.1, Spring Security + JWT, Spring Data JPA / Hibernate |
| Base de données | PostgreSQL 18 |
| Conteneurisation | Docker Compose (db, api, web) |
| Exposition | Cloudflare Tunnel (https://librarian.karitchi.com) |

## Démarrage en développement

```bash
# Base de données
cd backend && docker compose up -d

# Backend (port 8080)
cd backend && ./mvnw spring-boot:run

# Frontend (port 5173)
cd frontend && npm run dev
```

Copier les fichiers `.env.example` vers `.env` et remplir les valeurs manquantes avant le premier lancement.

## IA générative

Ce projet a été développé en tandem avec **opencode** (agent CLI d'IA générative). L'IA a été utilisée pour :

- Générer la quasi-totalité du code (composants React, contrôleurs, services, configuration)
- Corriger des bugs et des violations de typage
- Guider les choix d'architecture (structure des routes, sécurité, organisation des fichiers)
- Télécharger et intégrer 55 couvertures de livres depuis Open Library
- Rédiger la documentation et les fichiers de configuration

Le développeur humain a supervisé chaque modification, validé le comportement et fourni les orientations fonctionnelles (choix esthétiques, décisions d'infrastructure, contraintes de sécurité).

## Déploiement

L'application tourne sur un serveur virtuel (VM) via Docker Compose. Les trois services (PostgreSQL, API Spring Boot, serveur React Router) sont lancés ensemble :

```bash
docker compose up -d --build
```

Un tunnel Cloudflare (`cloudflared`) expose le service web (port 3000) sur `https://librarian.karitchi.com`.
