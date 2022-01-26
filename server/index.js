import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';

import postRoutes from './routes/post.js'
import userRoutes from './routes/user.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT  

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
.catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)