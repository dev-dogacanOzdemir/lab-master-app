#!/bin/bash
set -e

# Backend'i başlat
echo "Starting Backend..."
cd bin
./create_db.sh
cd ../lab-master-backend
gnome-terminal -- bash -c "mvn spring-boot:run; exec bash"

# Ana dizine geri dön
cd ..

# Frontend'i başlat
echo "Starting Frontend..."
cd lab-master-frontend
npm install
gnome-terminal -- bash -c "npm run dev; exec bash"

# Bitir ve kullanıcıdan giriş bekle
read -p "Press any key to continue..."
