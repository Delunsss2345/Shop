// src/config/database.js - SIMPLE VERSION
const dotenv = require('dotenv') ; 
dotenv.config() ; 
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD, 
        database: process.env.DB_NAME,          
        host: "127.0.0.1",
        port: 3306,
        dialect: "mysql",
        logging: console.log,      
        dialectOptions: {
            bigNumberStrings: true,
        },
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            underscored: true,
            freezeTableName: true,
            timestamps: true
        }
    }
};