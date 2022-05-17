import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password:{
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  }
})

//fire a function after doc saved to db
/*userSchema.post('save', function(doc, next){
  console.log('new user was created and saved', doc)
  next()
})*/

//fire a function before doc saved to db
userSchema.pre('save',async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model('user', userSchema)

export default User