import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import { clerkWebhooks } from './controllers/webhooks.js';

//initialize express

const app = express();

//connect db

await connectDB();

//middleware

app.use(cors())

//Route
app.get('/', (req,res) => res.send('api working'));
app.post('/clerk', express.json(), clerkWebhooks)

//port

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})