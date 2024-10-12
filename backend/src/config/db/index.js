const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://ntpd164:QA3x5NxC9*3fWe5@cluster0.1tlq4.mongodb.net/movie_app', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    console.log('Connect successfully!!!')
  } catch (error) {
    console.log('Connect failure!!!')
  }
}

module.exports = { connect }
