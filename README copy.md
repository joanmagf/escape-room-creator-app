# 🌐 Aplicació Web - Escape Room Creator

## 📋 Descripció

Aquesta és l'aplicació web principal del projecte Escape Room Creator, desenvolupada amb Next.js 14, React 18 i TypeScript. Permet crear, editar i visualitzar escape rooms virtuals amb experiències immersives.

## 🚀 Tecnologies Utilitzades

- **Framework**: Next.js 14 amb App Router
- **Frontend**: React 18 amb TypeScript
- **Estils**: Tailwind CSS + Shadcn/UI
- **3D/VR**: A-Frame per a experiències immersives
- **Desenvolupament**: ESLint + Prettier

## 🛠️ Instal·lació i Configuració

### Requisits Previs
- Node.js 18+ 
- npm o yarn

### Passos d'Instal·lació

```bash
# Instal·lar dependències
npm install

# Executar en mode desenvolupament
npm run dev

# Construir per a producció
npm run build

# Executar en mode producció
npm start
```

## 📁 Estructura de l'Aplicació

```
web/
├── app/                      # App Router de Next.js
│   ├── page.tsx             # Pàgina principal
│   ├── layout.tsx           # Layout principal
│   ├── globals.css          # Estils globals
│   ├── editor/              # Editor d'escape rooms
│   ├── viewer/              # Visualitzador d'escape rooms
│   ├── dashboard/           # Panell de control
│   └── api/                 # API routes
├── components/              # Components reutilitzables
│   ├── ui/                  # Components d'interfície
│   └── editor/              # Components de l'editor
├── public/                  # Recursos estàtics
├── package.json             # Configuració del projecte
└── tailwind.config.ts       # Configuració de Tailwind
```

## 🎮 Funcionalitats Principals

### Editor d'Escape Rooms
- **Interfície visual**: Drag & drop per a crear escenes
- **Components 3D**: Biblioteca d'objectes i models
- **Sistema d'enigmes**: Creació de puzles interactius
- **Previsualització**: Vista prèvia en temps real

### Visualitzador VR
- **Experiència immersiva**: Suport per a ulleres VR
- **Navegació intuïtiva**: Controls adaptats per a diferents dispositius
- **Interacció**: Sistema de clicks i gestos
- **Àudio espacial**: So 3D per a major immersió

### Panell de Control
- **Gestió de projectes**: Crear, editar i eliminar escape rooms
- **Estadístiques**: Seguiment d'ús i rendiment
- **Compartició**: Enllaços per a compartir amb estudiants
- **Exportació**: Descàrrega de projectes

## 🔧 Scripts Disponibles

```bash
# Desenvolupament
npm run dev          # Servidor de desenvolupament
npm run build        # Construcció per a producció
npm run start        # Servidor de producció
npm run lint         # Verificació de codi
```

## 🌐 URLs de l'Aplicació

- **Pàgina principal**: `http://localhost:3000`
- **Editor**: `http://localhost:3000/editor`
- **Visualitzador**: `http://localhost:3000/viewer/[roomId]`
- **Panell de control**: `http://localhost:3000/dashboard`

## 📚 Documentació Tècnica

### Components Principals

#### Editor
- `EditorCanvas`: Llenç principal de l'editor
- `ComponentLibrary`: Biblioteca de components 3D
- `PropertyPanel`: Panell de propietats
- `SceneHierarchy`: Jerarquia d'objectes

#### Viewer
- `VRScene`: Escena principal de realitat virtual
- `NavigationControls`: Controls de navegació
- `InteractionSystem`: Sistema d'interaccions
- `UIOverlay`: Interfície superposada

### Configuració A-Frame

L'aplicació utilitza A-Frame per a les experiències VR:

```javascript
// Configuració bàsica d'A-Frame
AFRAME.registerComponent('escape-room', {
  schema: {
    roomId: {type: 'string'},
    difficulty: {type: 'string', default: 'medium'}
  },
  init: function () {
    // Inicialització de l'escape room
  }
});
```

## 🐛 Resolució de Problemes

### Problemes Comuns

1. **Error de dependències**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Problemes amb A-Frame**
   - Verificar que el navegador suporte WebGL
   - Comprovar la configuració de CORS

3. **Errors de TypeScript**
   ```bash
   npm run lint
   ```

## 🤝 Contribució

Per a contribuir al desenvolupament:

1. Fork del repositori
2. Crear una branca per a la funcionalitat
3. Implementar els canvis
4. Executar les proves
5. Crear un Pull Request

## 📄 Llicència

Aquest projecte està sota llicència educativa. Consultar el fitxer LICENSE per a més detalls. 