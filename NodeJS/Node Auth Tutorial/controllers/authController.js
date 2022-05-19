import User from "../models/user.js"
import jwt from 'jsonwebtoken'

const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { email:'', password:''}

  if(err.message==='incorrect email'){
    errors.email = 'That email is not registered'
    return errors
  }
  if(err.message==='incorrect password'){
    errors.password = 'That password is incorrect'
    return errors
  }

  //duplicade error code
  if(err.code === 11000){
    errors.email = 'That email is already registered'
    return errors
  }
  //validation errors
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) =>{
      errors[properties.path] = properties.message
    })
  }
  return errors
}

const maxAge = 3*24*60*60 //3 days
const createToken = (id) => {
  return jwt.sign({ id }, 'pgo-dev', {
    expiresIn: maxAge
  })
}

function signup_get(req,res){
  res.render('signup')
}

async function signup_post(req,res){
  const { email, password} = req.body
  try{
    const user = await User.create({email, password})
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
    res.status(201).json({user: user._id})
  }catch(err){
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

function login_get(req,res){
  res.render('login')
}

async function login_post(req,res){
  const { email, password} = req.body
  try{
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
    res.status(200).json({user: user._id})
  }catch(err){
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

function logout_get(req, res){
  res.cookie('jwt', '', { maxAge:1} )
  res.redirect('/')
}

export default {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get
}