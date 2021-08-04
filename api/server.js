const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');

const recipeRoutes = require('./routes/recipes');
const baseballRoutes = require('./routes/baseball');
//suppress once setup is complete
const SetupRecipeDb = require('./data/recipes');
// Database URL and Name
const url = 'mongodb://localhost:27017/';
const dbName = 'VRxD';

//note: remove once we have real db
mongoose.connect( url+dbName, { useNewUrlParser : true }).then(() => {
  const setupDb = new SetupRecipeDb();
  setupDb.seedDb();
});

const app = express();

app.use(bodyParser.json());

//app.use("/api/v1/recipe", recipeRoutes);
//app.use("/api/v1/baseball", baseballRoutes);

const PORT = process.env.PORT || 6474;

app.listen(PORT, function(){
    console.log("Node Server is Running");
});
