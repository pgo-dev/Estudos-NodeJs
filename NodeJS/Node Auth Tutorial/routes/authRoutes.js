import express from 'express'
import authController from '../controllers/authController.js'

const router = express.Router()

router.get('/', (req, res)=>{
  console.log('OK')
  res.end()
})

router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)

export default router