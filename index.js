const express = require('express');
const connectDB = require('./config/db');
const app = express();

app.use(express.json({extended: false}));
connectDB();

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/Url'))
const PORT = 5000;

app.listen(PORT,()=>console.log(`Server running on PORT:: ${PORT}`));