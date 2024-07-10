@echo off
SETLOCAL

REM MySQL komut satırının yolunu ayarlayın
SET MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin

REM Veritabanı ayarları
SET DB_NAME=lab_master_db
SET DB_USER=root
SET DB_PASSWORD=

REM MySQL komut satırı aracı ile veritabanı oluşturma
"%MYSQL_PATH%\mysql" -u %DB_USER% -p%DB_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME%;"

ENDLOCAL
@echo on
