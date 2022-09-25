const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://thanish13:thanish13@cluster0.kokod37.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

module.exports = connectDB;