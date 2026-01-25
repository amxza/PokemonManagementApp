const {Router} = require("express");
const indexRoute = Router();
const control = require("../controllers/controls");

indexRoute.get("/", control.getAll);

indexRoute.get("/new", (req, res) => {
    res.send("CURRY > LEBRON, KD, MJ");
});

module.exports = indexRoute;