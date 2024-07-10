@echo off
setlocal



:: Backend'i başlat
echo Starting Backend...
call bin\create_db.bat
cd ./lab-master-backend
start cmd /k "mvn spring-boot:run"

:: Ana dizine geri dön
cd ..

:: Frontend'i başlat
echo Starting Frontend...
cd ./lab-master-frontend
start cmd /k "npm install && npm run dev"

:: Bitir ve kullanıcıdan giriş bekle
pause
endlocal
