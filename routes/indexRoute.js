const {Router} = require("express");
const indexRoute = Router();

indexRoute.get("/", (req, res) => {
    res.send("Hello Guyd HOw do you do");
});

indexRoute.get("/new", (req, res) => {
    res.send("CURRY > LEBRON, KD, MJ");
});

module.exports = indexRoute;