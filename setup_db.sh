#!/bin/bash

echo "Setting up database for Checkmate Dashboard..."

# Try to connect with different authentication methods
echo "Please enter your MySQL root password (or press Enter if none):"
read -s MYSQL_PWD

export MYSQL_PWD

# Create database and import schema
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ape;" 2>/dev/null || {
    echo "Failed with root user, trying with current user..."
    mysql -u $USER -e "CREATE DATABASE IF NOT EXISTS ape;" 2>/dev/null || {
        echo "Failed to create database. Please run:"
        echo "sudo mysql -e \"CREATE DATABASE IF NOT EXISTS ape; CREATE USER IF NOT EXISTS '$USER'@'localhost' IDENTIFIED BY ''; GRANT ALL PRIVILEGES ON ape.* TO '$USER'@'localhost'; FLUSH PRIVILEGES;\""
        exit 1
    }
}

# Import schema
echo "Importing schema..."
mysql -u root ape < schema.sql 2>/dev/null || mysql -u $USER ape < schema.sql

# Import data
echo "Importing data..."
mysql -u root ape < data.sql 2>/dev/null || mysql -u $USER ape < data.sql

echo "Database setup complete!"