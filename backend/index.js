import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import authRoute from './routers/authRouter.js'
import userRoute from './routers/userRouter.js'
import msgRoute from './routers/msgRouter.js'
import connectDB from './db.js';
import cors from 'cors'
import { saveMsg } from './controllers/msgController.js';

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

// msg route
app.use('/api/v1/msg', msgRoute)

const users = {};

io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on('register', (id)=>{
        users[id] = socket.id;
    })

    socket.on('message', ({msg,senderId,receiverId}) => {
        saveMsg({msg,senderId,receiverId})
        socket.to(users[receiverId]).emit('message', ({msg, senderId}));
        console.log("msg send", users)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});