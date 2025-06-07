#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Configurant la base de dades PostgreSQL...\n");

// Verificar si existeix el fitxer .env.local
const envPath = path.join(__dirname, "..", ".env.local");
if (!fs.existsSync(envPath)) {
  console.log("⚠️  Creant fitxer .env.local...");
  const envContent = `# Base de dades PostgreSQL
# Substitueix amb les teves credencials de PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/escape_room_db?schema=public"

# Configuracio de Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Configuracio de desenvolupament
NODE_ENV="development"
`;
  fs.writeFileSync(envPath, envContent);
  console.log(
    "✅ Fitxer .env.local creat. Edita-lo amb les teves credencials de PostgreSQL.\n"
  );
}

try {
  console.log("📦 Instal·lant dependències...");
  execSync("npm install", {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
  });

  console.log("\n🔧 Generant client de Prisma...");
  execSync("npx prisma generate", {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
  });

  console.log("\n📊 Aplicant migracions a la base de dades...");
  execSync("npx prisma db push", {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
  });

  console.log("\n✅ Base de dades configurada correctament!");
  console.log("\n📋 Passos següents:");
  console.log(
    "1. Edita el fitxer .env.local amb les teves credencials de PostgreSQL"
  );
  console.log("2. Executa: npm run dev");
  console.log(
    "3. Visita: http://localhost:3000/api/rooms/migrate per migrar room-1.html"
  );
  console.log("4. Visita: http://localhost:3000/dashboard per veure les sales");
} catch (error) {
  console.error("❌ Error configurant la base de dades:", error.message);
  console.log("\n🔍 Assegura't que:");
  console.log("- PostgreSQL està instal·lat i funcionant");
  console.log("- Les credencials al fitxer .env.local són correctes");
  console.log("- La base de dades especificada existeix");
  process.exit(1);
}
