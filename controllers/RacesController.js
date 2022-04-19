const Races = require("../models/Races");

exports.GetRacesList = (req, res, next) => {
  Races.findAll()
    .then((result) => {
      const races = result.map((result) => result.dataValues);

      res.render("races/races-list", {
        pageTitle: "Races",
        racesActive: true,
        races: races,
        hasRaces: races.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateRaces = (req, res, next) => {
  res.render("races/save-races", {
    pageTitle: "Create races",
    racesActive: true,
    editMode: false,
  });
};

exports.PostCreateRaces = (req, res, next) => {
  const raceName = req.body.Name;

  Races.create({ name: raceName })
    .then((result) => {
      res.redirect("/races");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditRaces = (req, res, next) => {
  const edit = req.query.edit;
  const raceId = req.params.racesId;

  if (!edit) {
    return res.redirect("/races");
  }

  Races.findOne({ where: { id: raceId } })
    .then((result) => {
      const race = result.dataValues;

      if (!race) {
        return res.redirect("/races");
      }
      res.render("races/save-races", {
        pageTitle: "Edit races",
        racesActive: true,
        editMode: edit,
        race: race,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditRaces = (req, res, next) => {
  const raceName = req.body.Name; 
  const raceId = req.body.raceId;

  Races.update({ name: raceName }, { where: { id: raceId } })
    .then((result) => {
      return res.redirect("/races");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteRaces = (req, res, next) => {
  const raceId = req.body.racesId;

  Races.destroy({ where: { id: raceId } })
    .then((result) => {
      return res.redirect("/races");
    })
    .catch((err) => {
      console.log(err);
    });
};
