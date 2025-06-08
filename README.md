# Aplicació Web: Escape Room Creator

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](LICENSE)

Aquesta és l'aplicació web principal del projecte educatiu **[Escape Room Creator](https://github.com/lluisalen/escape-room-creator)**, desenvolupada amb Next.js 14, React 18 i TypeScript. Permet crear, editar i visualitzar escape rooms virtuals amb experiències immersives.

## 📚 Taula de continguts

- [Estructura de l'aplicació](#estructura-de-laplicació)
- [Instal·lació i Configuració](#installació-i-configuració)
- [Tecnologies i recursos](#tecnologies-irecursos)
- [Contribució](#configuració)

---

## 🌐 Estructura de l'Aplicació

```
escape-room-creator-app/
├── app/                          Aplicació Next.js
│   ├── api/                      Endpoints del servidor (API routes)
│   │   ├── create-room/         Crea una sala a public/rooms des d'una plantilla (html-templates/)
│   │   ├── rename-room/         Canvia el nom d'una sala a public/rooms
│   │   ├── save-scene/          Guarda l'estat d'una sala a public/rooms
│   │   ├── templates/           Retorna les plantilles disponibles (html-templates/)
│   │   └── rooms/               Retorna les sales disponibles (public/rooms)
│   ├── templates/               Pàgina per seleccionar plantilles per crear sales
│   ├── rooms/                   Pàgina amb la llista de sales creades
│   ├── editor/                  Pàgina amb el frame per construir l'escape room
│   ├── viewer/                  Pàgina per jugar dins d'una sala (mode jugador)
│   ├── login/                   Pàgina d'inici de sessió
│   └── lib/                     Tipatge d'objectes amb TypeScript
├── components/                  Components React reutilitzables
├── html-templates/              Plantilles HTML per crear sales
├── public/                      Fitxers estàtics públics
│   ├── rooms/                   Sales disponibles per jugar
│   └── lib-aframe/              Llibreries d'A-Frame i components SVG
└── package.json                 Configuració del projecte (dependències, scripts, etc.)
```

---

## 🛠️ Instal·lació i Configuració

```bash
# Clonar el repositori de l'aplicació web
git clone https://github.com/joanmagf/escape-room-creator-app.git
cd escape-room-creator-app

# Instal·lar dependències
npm install

# Executar en mode desenvolupament
npm run dev
```

Visita http://localhost:3000 per veure l'aplicació.

---

## 🔗 **Tecnologies i recursos**

- [Nodejs](https://nodejs.org/en/download)
- [Nextjs](https://nextjs.org/)
- [React](https://es.react.dev/)
- [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org/)
- [HTML](https://developer.mozilla.org/es/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)


---

## 🤝 Contribució

Per a contribuir al desenvolupament:

1. Fork del repositori
2. Crear una branca per a la funcionalitat
3. Implementar els canvis
4. Executar les proves
5. Crear un Pull Request