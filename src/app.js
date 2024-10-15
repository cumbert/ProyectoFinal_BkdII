import express from 'express'
import session from 'express-session'
import config from './config/config.js'
import { engine } from 'express-handlebars'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import usersRouter from './routes/users.router.js'
import viewsRouter from './routes/views.js'
import { initializeUsers } from '../src/services/factory.js'
import nodemailer from 'nodemailer'

const app = express()

await initializeUsers()


app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs')
app.set('views', './src/views')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'))

app.use(session({
    secret: process.env.SESSION_SECRET || 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL || 'dafaultconeccection'
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 
    }
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session()) 


app.use('/', viewsRouter)
app.use('/users', usersRouter)

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth:{
        user:"cristianw.pruebas@gmail.com",
        pass:"emnp smnv oslq aogr" //variable de entorno
    }
})

app.get('/mail', async(req,res) => {
let result = await transport.sendMail({
    from: "cristianw.pruebas@gmail.com",
    to: "cristian.umbert@gmail.com",
    subject: "Correo de Prueba",
    html: `
    <div>
    <h1>Correo enviado para prueba</h1>
    </div>
    `
})
}) 


app.get('/test', (req,res) =>{
    res.status(400).send({ message: 'Hola wacho!' })
})

// Error handler global
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: 'Something went wrong!' })
});

app.listen( config.port , () => {
    console.log(`Server is running on port ${ config.port}`)
});


