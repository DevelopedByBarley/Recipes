require('dotenv').config()
const port = process.env.PORT;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')



const indexRouter = require('./routes/index') 
const recipesRouter = require('./routes/new')


//Config
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.set('layout', __dirname + '/views/layouts/layout');

app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/recipes', recipesRouter)



//Database

mongoose.connect(`mongodb://localhost/${process.env.SERVER_NAME}`)
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log(`Database is connected on port ${port}` ))



app.listen(port);