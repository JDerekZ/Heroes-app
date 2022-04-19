const Heroes = require("../models/Heroes");
const Races = require("../models/Races");

exports.GetHeroesList = (req, res, next) => {
  Heroes.findAll({include:[{model: Races}]})
    .then((result) => {
      const heroes = result.map((result) => result.dataValues);     

      res.render("heroes/heroes-list", {
        pageTitle: "Heroes",
        homeActive: true,
        heroes: heroes,
        hasHeroes: heroes.length > 0
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateHeroes = (req, res, next) => {
  Races.findAll()
    .then((result) => {
      const races = result.map((result) => result.dataValues);

      res.render("heroes/save-heroes", {
        pageTitle: "Create heroes",
        homeActive: true,
        editMode: false,
        races: races,
        hasRaces: races.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostCreateHeroes = (req, res, next) => {
  const heroName = req.body.Name;
  const heroDescription = req.body.Description;
  const heroRaces = req.body.Races;

  Heroes.create({
    name: heroName,
    description: heroDescription,
    raceId: heroRaces,
  })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditHeroes = (req, res, next) => {
  const edit = req.query.edit;
  const heroId = req.params.heroesId;

  if (!edit) {
    return res.redirect("/");
  }

  Heroes.findOne({ where: { id: heroId } })
    .then((result) => {
      const hero = result.dataValues;   

      if (!hero) {
        return res.redirect("/");
      }

      console.log(hero);

      Races.findAll()
        .then((result) => {
          const races = result.map((result) => result.dataValues);

          res.render("heroes/save-heroes", {
            pageTitle: "Edit heroes",
            homeActive: true,
            editMode: edit,
            hero: hero,
            races: races,
            hasRaces: races.length > 0
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditHeroes = (req, res, next) => {
  const heroName = req.body.Name;
  const heroDescription = req.body.Description;
  const heroRaces = req.body.Races;
  const heroId = req.body.heroId;

  Heroes.update(
    { name: heroName, description: heroDescription, raceId: heroRaces },
    { where: { id: heroId } }
  )
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteHeroes = (req, res, next) => {
  const heroId = req.body.heroesId;

  Heroes.destroy({ where: { id: heroId } })
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
