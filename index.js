const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000 
const nhentaiRoute = require('./routes/nhentai')
// const authRoute = require('./routes/auth')

//plugin
app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(bodyParser({
    extended: true
}))

//route
app.use('/nhentai', nhentaiRoute)

// app.use('/auth', authRoute)

app.listen(port, () => console.log("app is running at port " + port))