const express = require('express');

const router = express.Router();

const racesController = require('../controllers/RacesController');

router.get("/races", racesController.GetRacesList);
router.get("/create-races", racesController.GetCreateRaces);
router.post("/create-races", racesController.PostCreateRaces);
router.get("/edit-races/:racesId", racesController.GetEditRaces);
router.post("/edit-races", racesController.PostEditRaces);
router.post("/delete-races", racesController.PostDeleteRaces);


module.exports = router;
