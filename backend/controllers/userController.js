const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password, businessName, businessAddress, webSite } = req.body;

  try {
    const user = await User.signup(firstName, lastName, phoneNumber, email, password, businessName, businessAddress, webSite);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user details
const getUserDetails = async (req, res) => {

  try {
    console.log('Request  to /api/user/details')
    const userId = req.user._id
    const user = await User.findById(userId)
    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching user details:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id
    const updatedUser = req.body

    // Update the user details in the database
    const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true })

    res.status(200).json(user)
  } catch (error) {
    console.error('Error updating user details:', error)
    res.status(500).json({ error: 'Internal Server Error'})
  }
}

module.exports = { signupUser, loginUser, getUserDetails, updateUser };
