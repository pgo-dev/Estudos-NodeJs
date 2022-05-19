import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import { requireAuth, checkUser} from './middleware/authMiddleware.js'

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://pgodev:test4567@cluster0.wbqcu.mongodb.net/node-auth';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000,()=>{
    console.log('Server up')
  }))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)
