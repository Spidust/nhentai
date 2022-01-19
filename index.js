const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000 
const nhentaiRoute = require('./routes/nhentai')

app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(bodyParser({
    extended: true
}))

app.use('/nhentai', nhentaiRoute)

app.use('/', (req, res) => res.send('hello world'))

app.listen(port, () => console.log("app is running at port " + port))