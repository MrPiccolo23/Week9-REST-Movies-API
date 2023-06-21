const { validationResult } = require('express-validator');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register function 
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json("check your data");
  }

  // get user input
  const { name, email, password } = req.body;

  // check if user already exists
  let existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json("user exist");
  }

  // hash password
  let hashedPassword;
  if (password) {
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      console.error(err);
      return res.status(500).json('Error hashing password');
    }
  } else {
    return res.status(400).json('Password is required');
  }


  // create user
  const createdUser = new User({
    name,
    email,
    password: hashedPassword
  });

  // save user to database
  try {
    await createdUser.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json('Error saving user to database');
  }

  // create and return JWT
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'supersecretkey',
      { expiresIn: '1h' });
  } catch (err) {
    console.error(err);
    return res.status(500).json('Error creating JWT');
  }
  res.status(201).json({ token: token, userId: createdUser.id });
}

// login function 
const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;

  // find user in database
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.error(err);
    return res.status(500).json('Error finding user in database');
  }

  // check if user was found
  if (!existingUser) {
    return res.status(400).json('Invalid credentials, could not log you in');
  }

  // compare passwords
  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.error(err);
    return res.status(500).json('Error comparing passwords');
  }

  // check if passwords match
  if (!isValidPassword) {
    return res.status(400).json('Invalid credentials, could not log you in.');
  }

  // create and return JWT
  let token;
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecretkey',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: existingUser.id });
  }



exports.register= register;
exports.login = login;

