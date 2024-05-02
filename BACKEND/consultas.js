const { Pool } = require('pg')
require('dotenv').config()

// Llevar a un nuevo archivo para conectar a la DataBase
const config = {
    host: process.env.HOST,
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true
}

const pool = new Pool(config)

const obtenerCard = async () => {
    const consulta = 'SELECT * FROM posts;'
    const { rows } = await pool.query(consulta)
    return rows
}

const agregarCard = async (titulo, url, descripcion) => {
    try {
        const id = Math.floor(Math.random() *9999)
        const consulta = 'INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5);'
        const values = [id, titulo, url, descripcion, 0]
        const result = await pool.query(consulta, values)
        return result
    } catch (error) {
        console.error(error)
    }
}

const modifyCard = async (id) => {
    try {
        // const consulta = 'UPDATE posts SET likes = $1 WHERE id = $2;'
        const consulta = 'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1'
        const values = [id]
        const result = await pool.query(consulta, values)
        return result
    } catch (error) {
        console.error(error)
    }
}

const deleteCard = async (id) => {
    try {
        const consulta = ' DELETE FROM posts WHERE id = $1;'
        const values = [id]
        const result = pool.query(consulta, values)
        return result
    } catch (error) {
        console.error(error)
    }
}

module.exports = {obtenerCard, agregarCard,modifyCard, deleteCard}