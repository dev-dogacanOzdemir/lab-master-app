#!/bin/bash
set -e

# MySQL komut satırının yolunu ayarlayın
MYSQL_PATH="/usr/bin"

# Veritabanı ayarları
DB_NAME="lab_master_db"
DB_USER="root"
DB_PASSWORD=""

# MySQL komut satırı aracı ile veritabanı oluşturma
"$MYSQL_PATH/mysql" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
