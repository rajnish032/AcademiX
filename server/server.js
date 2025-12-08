import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import courseRouter from './routes/course.js';
import userRouter from './routes/user.js';

//initialize express

const app = express();

//connect db

await connectDB();

//middleware

app.use(cors())
app.use(clerkMiddleware());

//Route
app.get('/', (req,res) => res.send('api working'));
app.post('/clerk', express.json(), clerkWebhooks);
app.use('/api/educator', express.json(), educatorRouter );
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user',express.json(), userRouter);
app.post('/stripe', express.raw({ type: 'application/json'}),stripeWebhooks )

//port

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})