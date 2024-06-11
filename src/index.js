const express = require('express')
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const app = express();
// Here we are configuring express to use body-parser.
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text())

app.use('/users',userRouter);
app.use('/carts',cartRouter);
app.use('/auth',authRouter)

app.listen(serverConfig.PORT, async () => {
    await connectDB()
    console.log(`App listening on port ${serverConfig.PORT}`);
});


// 127.0.0.1:3000 => socket address
// IP:PORT => socket address

// SOLID