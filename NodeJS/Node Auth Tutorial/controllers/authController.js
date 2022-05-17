import User from "../models/user.js"

const handleErrors = (err) => {
  let errors = { email:'', password:''}
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

function signup_get(req,res){
  res.render('signup')
}

async function signup_post(req,res){
  const { email, password} = req.body
  try{
    const user = await User.create({email, password})
    res.status(201).json(user)
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
    const user = await User.create({email, password})
  }catch(err){

  }
}

export default {
  signup_get,
  signup_post,
  login_get,
  login_post
}