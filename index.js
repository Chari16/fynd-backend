const express = require('express')
const path = require('path')
const middlewares = require('./middlewares/global')
const { errorHandler } = require('./middlewares/errorHandler');
const userRouter = require('./routes/user.router');
const movieRouter = require('./routes/movie.router');
const { V1 } = require('./config');


//Database 
const db = require('./db')


const app = express()

app.use(middlewares)
// const publicDirectoryPath = path.join(__dirname, './public')
// app.use(express.static(publicDirectoryPath))

// const viewsPath = path.join(__dirname, './public/views')
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Server is Up')
})

app.get('/home', (req,res) => {
    res.send('This is home page')
})

app.use(`/api/${V1}/users`, userRouter)
app.use(`/api/${V1}/movies`, movieRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Imdb app listening at http://localhost:${port}`)
})