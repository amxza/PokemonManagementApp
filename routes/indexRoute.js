const {Router} = require("express");
const indexRoute = Router();
const control = require("../controllers/controls");

indexRoute.get("/", control.getAll);
indexRoute.get("/new", control.newTrainer);
indexRoute.post("/new", control.getNewTrainer);

module.exports = indexRoute;