const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from my personal Smarty Pant!! with auto restart')
});

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com', phone: '0178888888' },
    { id: 2, name: 'Shabnoor', email: 'Shabnoor@gmail.com', phone: '0178888888' },
    { id: 3, name: 'Suchorita', email: 'Suchorita@gmail.com', phone: '0178888888' },
    { id: 4, name: 'suchonda', email: 'suchonda@gmail.com', phone: '0178888888' },
    { id: 5, name: 'srabonti', email: 'srabonti@gmail.com', phone: '0178888888' },
    { id: 6, name: 'sabila', email: 'sabila@gmail.com', phone: '0178888888' },
    { id: 7, name: 'sohana', email: 'sohana@gmail.com', phone: '0178888888' },
]

app.get('/users', (req, res) => {
    res.send(users);
})



const uri = "mongodb+srv://dbuser1:rjLsZLxJMOqsG8mK@cluster0.9mv6kq4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const userCollection = client.db("simpleNode");
        const haiku = userCollection.collection("users");
        // create a document to insert
        const user = {
            name: 'nirob',
            email: 'nirob@gmail.com'
        }
        // const result = await haiku.insertOne(user);
        // console.log(result);
        app.post('/user', async (req, res) => {
            console.log('request', req.body);
            const user = req.body;
            // users.push(user);
            const result = await haiku.insertOne(user);
            console.log(result);
            user.id = result.insertedId;
            res.send(user);
        });
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);



// filter by search query parameter
app.get('/users', (req, res) => {
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const matched = users.filter(user => user.name.toLowerCase().includes(search))
        res.send(matched);
    }
    else {
        res.send(users);
    }
});

app.get('/user/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    res.send(user);
});


// app.post('/user', (req, res) => {
//     console.log('request', req.body);
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     res.send(user);
// });

// app.get('/fruits', (req, res) =>{
//     res.send(['mango', 'apple', 'oranges']);
// });

// app.get('/fruits/mango/fazle', (req, res) =>{
//     res.send('sour sour fazle flavor');
// });


app.listen(port, () => {
    console.log('Listening to port', port)
})