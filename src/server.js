const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
const port = 8888

const server_url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(server_url)

//подключение к БД
async function connectToMongo() {
    try {
        await client.connect()
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error)
    }
}

connectToMongo()

app.use(express.json())
app.use(cors())

const db = client.db('react-market')

/******************** авторизация  ***********************/

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await db.collection('users').findOne({ email })

    if (!user) {
        res.status(401).json({ error: 'Пользователь не найден' })
    } else {
        bcrypt.compare(password, user.password, (error, passwordMatch) => {
            if (error) {
                res.status(500).json({ error: 'Ошибка сравнения паролей' })
            } else if (passwordMatch) {
                const token = jwt.sign({ userId: user._id }, 'react-shop', {
                    expiresIn: '1h',
                })

                res.json({ token })
            } else {
                res.status(401).json({ error: 'Неверный пароль' })
            }
        })
    }
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    const saltRounds = 10

    bcrypt.hash(password, saltRounds, async (error, hash) => {
        if (error) {
            res.status(500).json({ error: 'Ошибка шифрования пароля' })
        } else {
            const user = {
                username,
                email,
                password: hash,
            }

            try {
                await db.collection('users').insertOne(user)
                res.json({ message: 'Новый пользователь успешно зарегистрирован' })
            } catch {
                res.status(500).json({ error: 'Ошибка регистрации пользователя' })
            }
        }
    })
})

/******************** товары  ***********************/

//получение всех товаров
app.get('/products', async (req, res) => {
    const products = await db.collection('products').find().toArray()
    res.json(products)
})

//получение товара по id
app.get('/products/:id', async (req, res) => {
    const product = await db
        .collection('products')
        .findOne({ _id: new ObjectId(req.params.id) })
    res.json(product)
})

//добавление товара
app.post('/products', async (req, res) => {
    await db.collection('products').insertOne(req.body)
    res.json({ message: 'Товар успешно добавлен' })
})

//изменение товара
app.put('/products/:id', async (req, res) => {
    await db
        .collection('products')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    res.json({ message: 'Товар успешно обновлен' })
})

//удаление товара
app.delete('/products/:id', async (req, res) => {
    await db
        .collection('products')
        .deleteOne({ _id: new ObjectId(req.params.id) })
    res.json({ message: 'Товар успешно удален' })
})

//запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
})
