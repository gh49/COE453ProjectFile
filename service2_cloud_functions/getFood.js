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

const Food = mongoose.model('Food', Food_Schema);

functions.http('food', (req, res) => {
  // Use CORS middleware
  cors(req, res, () => {
    //res.set('Access-Control-Allow-Origin', "*");
    //res.set('Access-Control-Allow-Methods', 'GET, POST');

    // Fetch data from MongoDB
    Food.find({}).then(foods => {
      console.log(foods);
      return res.json({ foods: foods });
    }).catch(error => {
      console.log(error);
      return res.status(500).send("Error: " + error.message);
    });
  });
});
