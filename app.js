const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Middleware para archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

async function main() {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db('mydatabase');
    const collection = db.collection('documents');

    // Ruta para la API (devuelve JSON)
    app.get('/api/data', async (req, res) => {
        const docs = await collection.find({}).toArray();
        res.json(docs);
    });

    // Ruta principal sirve el HTML
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
}

main().catch(console.error);
