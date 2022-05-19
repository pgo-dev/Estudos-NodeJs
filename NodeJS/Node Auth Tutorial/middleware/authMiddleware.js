import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const requireAuth = (req, res, next) =>{
  const token = req.cookies.jwt
  // check token existence
  if(token){
    jwt.verify(token, 'pgo-dev', (err, decodedToken)=>{
      if(err){
        console.log(err.message)
        res.redirect('/login')
      }else{
        console.log(decodedToken)
        next()
      }
    })
  }
  else{
    res.redirect('login')
  }
}

// check current user
const checkUser = (req, res, next)=>{
  const token = req.cookies.jwt

  if(token){
    if(token){
      jwt.verify(token, 'pgo-dev', async (err, decodedToken)=>{
        if(err){
          console.log(err.message)
          res.locals.user = null
          next()
        }else{
          console.log(decodedToken)
          let user = await User.findById(decodedToken.id)
          res.locals.user = user
          next()
        }
      })
    }
  }

  else{
    res.locals.user = null
    next()
  }
}

export { 
  requireAuth,
  checkUser
}