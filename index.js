const express = require('express')
const app = express()
const { API } = require('nhentai-api')
const nhentai = new API()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000 

app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(bodyParser({
    extended: true
}))

app.use('/', (req, res) => res.send('hello world'))

app.listen(port, () => console.log("app is running at port " + port))