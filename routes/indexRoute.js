const {Router} = require("express");
const indexRoute = Router();
const control = require("../controllers/controls");

indexRoute.get("/", control.getAllTrainers);
indexRoute.get("/new", control.newTrainer);
indexRoute.post("/new", control.getNewTrainer);
indexRoute.get("/trainer/:id", control.viewTrainerPokemon);
indexRoute.get("/trainer/:id/newpokemon", control.addPokemon);
indexRoute.post("/trainer/:id/newpokemon", control.getAddPokemon);
indexRoute.get("/trainer/:id/pokemon/:pokeId", control.getPokemonDetails);
indexRoute.get("/allpokemon", control.getAllPokemon);
module.exports = indexRoute;