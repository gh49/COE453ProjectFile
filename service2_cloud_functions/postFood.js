const functions = require('@google-cloud/functions-framework');
const mongoose = require("mongoose");
const cors = require('cors')({origin: true});

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

functions.http('food', (req, res) => {
  cors(req, res, () => {
    const food = new Food(req.body);
  food.save().then(food => {
    return res.json({food: food});
  }).catch(error => {
    return res.status(401).send("Failed");
  });
  });
});