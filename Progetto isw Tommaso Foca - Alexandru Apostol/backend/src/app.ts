import cookieParser from 'cookie-parser'
import express, { Express } from 'express'
import cors from 'cors'
import forumRouter from './routes/forum-router'
import loginRouter from './routes/login-router'
import history from 'connect-history-api-fallback'
import bodyParser from 'body-parser'
import { deleteUser, editUser, getProfile, getUserById, getUsernameById, login, logout, register, usersList } from './controllers/login-controller'
//import { loginController } from './controllers/login-controller'

const app: Express = express()
const port: number = 3000

app.use(history())
app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.json())
//app.use(express.static('dist-frontend'))

app.use(cors())
app.use(forumRouter)
app.use(loginRouter)
app.use(express.json())

app.post('/api/register', register)
app.post('/api/login', login)
app.get('/api/profile', getProfile)
app.get('/api/profile/:id', getUserById)
app.post('/api/logout', logout)
app.get('/api/usersList', usersList)
app.delete('/api/usersList/:id', deleteUser)
app.get('/api/users/:id', getUsernameById)
app.post('/api/users/edit', editUser)

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // alcune implementazioni del browser richiedono anche questo
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain')
  res.status(404).send('Ops... Pagina non trovata')
})

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`)
})
