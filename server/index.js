import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
const pass = 'fYv4LqCvHohMISGN modstacks'

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const CONNECTION_URL = `mongodb+srv://modstacks:fYv4LqCvHohMISGN@cluster0.yuaby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000 

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
.catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)