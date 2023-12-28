const express = require ('express')
const dotenv = require ('dotenv')
const colors = require ('colors')
const morgan = require ('morgan')
const cors = require ('cors')
const connectDB = require('./config/db')
const path = require('path')

//dot config
dotenv.config()

//mongobd connections
connectDB();

//rest object to create server
const app = express();  //variable to store express fumctionality

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
//Routes
app.use('/api/v1/test',require('./routes/testroute'));
app.use('/api/v1/auth',require('./routes/authRoutes'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));
app.use('api/v1/analytics',require('./routes/analyticsRoute'));
app.use('/api/v1/admin',require("./routes/adminRoutes"))

//static
app.use(express.static(path.join(__dirname,'./client/build')))

//static routr 
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})
//port
const PORT = process.env.PORT || 8080;

//listen
app.listen (PORT , ()=>{
    console.log (`server is running in ${process.env.DEV_MODE} made on http://localhost:${process.env.PORT}`.bgBlue.white)
})
