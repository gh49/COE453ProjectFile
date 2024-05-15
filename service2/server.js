// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Setup Database
const db_url = "mongodb+srv://admin:admin@coe453project.b7gjegg.mongodb.net/?retryWrites=true&w=majority&appName=coe453project";
mongoose.connect(db_url);

// Define Food Schema
const Food_Schema = new mongoose.Schema({
  name: String,
  calories: {
      type: Number,
      min: 0
  }
});

// Define Food Model
const Food = mongoose.model('Food', Food_Schema);

// Setup express and use middlewares
const app = express();
app.use(cors());
app.use(express.json());

// Routes

// Get all foods in database
app.get('/food', async (req, res) => {
  Food.find({}).then(foods => {
    console.log(foods);
    return res.json({foods: foods});
  }).catch(error => {
    console.log(error);
    return res.status(401).send("Error: " + error.message);
  })
});

// Add a food type to the database
app.post('/food', (req, res) => {
  const food = new Food(req.body);
  food.save().then(food => {
    return res.json({food: food});
  }).catch(error => {
    return res.status(401).send("Failed");
  });
});

// Listen to requests
app.listen(3000, function () {
  console.log('Server running!');
});