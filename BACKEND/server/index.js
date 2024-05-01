const express = require('express')
const cors = require('cors')
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

const app = express()

// Confirguar Postgres
const pool = new Pool(config)

// Conexión al Servidor
app.listen(3000, console.log("Servidor conectado"))

// MiddleWare
app.use(express.json())
app.use(cors())

// Crear las rutas
app.get('/posts', async (req,res) => {
    try {
        const query = "SELECT * FROM posts;"
        const { rows } = await pool.query(query)
        // console.log(response)
        res.json(rows)
    } catch (error) {
        console.error('Error detectado',error)
    }
})

app.post('/posts', async (req, res) => {
    try {
        // Obtener los elementos del Front
        const {titulo, url, descripcion} = req.body
        // Se crea el ID
        const id = Math.floor(Math.random()*9999)
        // Se debe generar una validación si se traen lo que trae en Body
        const query = "INSERT INTO posts (id,titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5)"
        const values = [id, titulo, url, descripcion, 0]
        const { rows }= await pool.query(query, values)
        res.json('Se envía la información con éxito')
        // res.json(rows)
        // console.log(rows)
    } catch (error) {
        console.log(error)
    }
})

// Segunda parte del desafío
// Vamos a probar ahora si todo se sube bien