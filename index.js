const express = require ('express');

const userRouter = require('./routes/route.user');
const readyOrdersRouter = require('./routes/route.readyorders');
const readyOrdersStories = require('./routes/route.readyordersstories')
const materialsRouter = require('./routes/route.materials');
const ordersRouter = require('./routes/route.orders');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();


app.use(express.json());
app.use ('/api', userRouter);
app.use ('/api', readyOrdersRouter);
app.use('/api', readyOrdersStories);
app.use('/api', materialsRouter );
app.use('/api', ordersRouter);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});
