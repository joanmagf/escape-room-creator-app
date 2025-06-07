# 🗄️ Configuració de la Base de Dades PostgreSQL

Aquest document explica com configurar PostgreSQL per al teu projecte d'Escape Room Creator i com migrar el contingut de `room-1.html` a la base de dades.

## 📋 Prerequisits

1. **PostgreSQL instal·lat** al teu sistema
2. **Node.js** (versió 18 o superior)
3. **npm** o **yarn**

## 🚀 Instal·lació de PostgreSQL

### macOS (amb Homebrew)
```bash
brew install postgresql
brew services start postgresql
```

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Windows
Descarrega i instal·la des de: https://www.postgresql.org/download/windows/

## 🔧 Configuració Inicial

### 1. Crear la Base de Dades
```bash
# Connectar com a usuari postgres
sudo -u postgres psql

# Crear la base de dades
CREATE DATABASE escape_room_db;

# Crear un usuari (opcional)
CREATE USER escape_user WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE escape_room_db TO escape_user;

# Sortir
\q
```

### 2. Configurar Variables d'Entorn
Crea un fitxer `.env.local` a la carpeta `web/`:

```env
# Base de dades PostgreSQL
DATABASE_URL="postgresql://escape_user:password123@localhost:5432/escape_room_db?schema=public"

# Configuració de Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Configuració de desenvolupament
NODE_ENV="development"
```

### 3. Instal·lar Dependències
```bash
cd web
npm install
```

### 4. Configurar Prisma
```bash
# Generar el client de Prisma
npm run db:generate

# Aplicar l'esquema a la base de dades
npm run db:push
```

## 📊 Migració de room-1.html

### Opció 1: Migració Automàtica via API
1. Inicia el servidor de desenvolupament:
```bash
npm run dev
```

2. Visita l'endpoint de migració:
```
http://localhost:3000/api/rooms/migrate
```

3. Això crearà una nova sala a la base de dades amb el contingut de `room-1.html`

### Opció 2: Migració Manual
```bash
# Executar el script de migració
node scripts/migrate-room-1.js
```

## 🎮 Verificar la Configuració

1. **Veure les sales**: http://localhost:3000/dashboard
2. **Jugar una sala**: http://localhost:3000/viewer/[room-id]
3. **Editar una sala**: http://localhost:3000/editor/[room-id]
4. **Prisma Studio**: `npm run db:studio`

## 🔄 Actualització de Sales

Ara les sales es guarden a la base de dades i es poden actualitzar de les següents maneres:

### Via Dashboard
1. Ves a `/dashboard`
2. Clica "Editar" a qualsevol sala
3. Modifica els elements
4. Clica "Guardar"

### Via API
```javascript
// Actualitzar una sala
fetch('/api/rooms/[id]', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Nou nom",
    description: "Nova descripció",
    htmlContent: "<a-box position='0 1 0'></a-box>"
  })
})
```

## 🛠️ Estructura de la Base de Dades

### Taules Principals

- **rooms**: Informació de les sales d'escape
- **entities**: Objectes 3D dins de cada sala
- **interactions**: Interaccions i lògica de joc
- **users**: Usuaris del sistema
- **user_progress**: Progrés dels usuaris

### Relacions
- Una sala pot tenir múltiples entitats
- Cada entitat pot tenir múltiples interaccions
- Els usuaris poden tenir progrés en múltiples sales

## 🐛 Resolució de Problemes

### Error de Connexió
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solució**: Assegura't que PostgreSQL està funcionant:
```bash
# macOS
brew services restart postgresql

# Linux
sudo systemctl restart postgresql
```

### Error d'Autenticació
```
Error: password authentication failed
```
**Solució**: Verifica les credencials al fitxer `.env.local`

### Error de Base de Dades No Trobada
```
Error: database "escape_room_db" does not exist
```
**Solució**: Crea la base de dades manualment:
```sql
CREATE DATABASE escape_room_db;
```

## 📚 Recursos Addicionals

- [Documentació de Prisma](https://www.prisma.io/docs/)
- [Documentació de PostgreSQL](https://www.postgresql.org/docs/)
- [A-Frame Documentation](https://aframe.io/docs/)

## 🤝 Suport

Si tens problemes amb la configuració, revisa:
1. Els logs del servidor (`npm run dev`)
2. Els logs de PostgreSQL
3. La configuració del fitxer `.env.local` 