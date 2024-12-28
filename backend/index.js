import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import authRoute from './routers/authRouter.js'
import userRoute from './routers/userRouter.js'
import connectDB from './db.js';
import cors from 'cors'

const app = express();
connectDB();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    return res.send("Hello world")
});

// auth route
app.use('/api/v1/auth', authRoute)

// user route
app.use('/api/v1/user', userRoute)

const users = {};

io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on('register', (id)=>{
        users[id] = socket.id;
        console.log(users);
    })

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});