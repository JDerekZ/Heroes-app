const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const sequelize = require("./util/database");
const Heroes = require("./models/Heroes");
const Races = require("./models/Races");

const errorController = require("./controllers/ErrorController");

const app = express();

const compareHelpers = require('./util/helpers/hbs/compare')

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
      equalValue: compareHelpers.EqualValue,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,"public")));

const heroesRouter = require('./routes/heroes');
const racesRouter = require("./routes/races");

app.use(heroesRouter);
app.use(racesRouter);

app.use(errorController.Get404);

Heroes.belongsTo(Races,{constraint: true,onDelete:"CASCADE"});
Races.hasMany(Heroes);

sequelize.sync().then(result=>{
  app.listen(5000);

}).catch(err =>{
    console.log(err);
})


