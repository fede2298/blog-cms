#!/bin/bash

# Script di setup per nuovo progetto
# Usage: ./scripts/setup.sh

set -e

echo "🚀 Setup progetto..."

# Verifica pnpm
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm non installato. Installa con: npm install -g pnpm"
    exit 1
fi

# Installa dipendenze
echo "📦 Installo dipendenze..."
pnpm install

# Verifica .env
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "📝 Copio .env.example in .env"
        cp .env.example .env
        echo "⚠️  Configura le variabili d'ambiente in .env"
    else
        echo "⚠️  Crea il file .env con le variabili necessarie"
    fi
fi

# Database
echo "🗄️  Setup database..."
read -p "Vuoi generare le migration? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    pnpm db:generate
    pnpm db:push
    echo "✅ Database pronto!"
fi

echo ""
echo "🎉 Setup completato!"
echo "Avvia con: pnpm dev"
