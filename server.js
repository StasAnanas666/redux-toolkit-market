const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 8888;
const db_uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(db_uri);

//подключение к БД
async function connectToMongo() {
    try {
        await client.connect();
        console.log("Connected to MongoDb");
    } catch (error) {
        console.error("Error connecting to MongoDb: ", error);
    }
}

connectToMongo();

app.use(express.json());
app.use(cors());

const db = client.db("redux-toolkit-market");

//*****************************************товары*****************************************

//получение всех товаров
app.get("/products", async (req, res) => {
    const products = await db.collection("products").find().toArray();
    res.json(products);
});

//получение товара по id
app.get("/products/:id", async (req, res) => {
    const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(req.params.id) });
    res.json(product);
});

//добавление товара
app.post("/products", async (req, res) => {
    await db.collection("products").insertOne(req.body);
    res.json({ message: "Товар успешно добавлен" });
});

//изменение товара
app.put("/products/:id", async (req, res) => {
    await db
        .collection("products")
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    res.json({ message: "Товар успешно обновлен" });
});

//удаление товара
app.delete("/products/:id", async (req, res) => {
    await db
        .collection("products")
        .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: "Товар успешно удален" });
});

//запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
