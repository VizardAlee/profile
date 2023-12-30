const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  businessName: {
    type: String,
    required: false,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  webSite: {
    type: String,
    required: false,
  },
})

// static signup method
userSchema.statics.signup = async function(firstName, lastName, phoneNumber, email, password, businessName, businessAddress, webSite) {
  // validation
  if ( !firstName || !email || !password ) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong emough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ firstName, lastName, phoneNumber, email, password: hash, businessName, businessAddress, webSite })
  console.log('User signed up:', user)

  return user

}

// static login meethod
userSchema.statics.login = async function(email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  console.log('User logged in:', user)

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}



module.exports = mongoose.model('User', userSchema)