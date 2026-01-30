const db = require("../db/queries");
const trainers = [
    {
        trainerName: "Ash",
        id: 1,
        pokemon: [
            {id: 101, name: "Pikachu", type: "Electric", description: "A yellow Mouse Pokemon"},
            { id: 102, name: "Charizard", type: "Fire", description: "A Fire Dragon Pokemon"},
            {id: 103, name: "Squirtle", type: "Water", description: "A water turtle pokemon"},
        ],
    },
    {
        trainerName: "Misty",
        id: 2,
        pokemon: [
            {id: 104, name: "Togepi",  type: "Normal", description: "The Eggshell Pokemon"},
            {id: 105, name: "Psyduck", type: "Water", description: "THe Duck Pokemon"},
        ],
    },
    {
        trainerName: "Brock",
        id: 3,
        pokemon: [
            {id: 106, name: "Onix", type: "Rock", description: "The Rock Snake Pokemon"},
        ],
    },
];

async function getAllTrainers(req, res) {
    const trainee = await db.getTrainers();
    console.log("Trainers: ", trainee);
    res.render("index", {title: "MainPage", trainers: trainers});
}

async function newTrainer(req, res) {
    res.render("trainers", {title: "New Trainer"});
}

async function getNewTrainer(req, res) {
    const newTrainer = req.body.newTrainer;
    const newTrainee = await db.addTrainer(newTrainer);
    console.log("New Trainer: ", newTrainee);
    trainers.push({trainerName: newTrainer, id: trainers.length + 1, pokemon: []});
    res.redirect("/");
}
async function viewTrainerPokemon(req, res) {
    const trainerID = req.params.id;

    const tPokemon = trainers.find(p => String(p.id) === trainerID);

    if (!tPokemon) {
        return res.status(404).send("Player Not Found...");
    }

    res.render("trainerPokemon", {tPokemon: tPokemon});
};

async function addPokemon(req, res) {
    const newPoke = trainers.find(p => String(p.id) === req.params.id);

    res.render("newPokemon", {newPoke: newPoke})
}

async function getAddPokemon(req, res) {
    const trainerID = req.params.id;
    const {name, type, description} = req.body;

    const newPoke = trainers.find(p => String(p.id) === trainerID);

    if(newPoke) {
        newPoke.pokemon.push({
            id: Date.now(),
            name: name,
            type: type,
            description: description,
        });
        res.redirect(`/trainer/${trainerID}`);
    } else {
        res.status(404).send("Pokemon not found");
    }
};

async function getPokemonDetails(req, res) {
    const {id, pokeId} = req.params;

    const trainer = trainers.find(t => String(t.id) === id);
    if (!trainer) return res.status(404).send("Trainer Not Found");

    const pokemon = trainer.pokemon.find(p => String(p.id) === pokeId);
    if(!pokemon) return res.status(404).send("Pokemon not found");

    res.render("pokemonDetails", {trainer, pokemon})
}

async function getAllPokemon(req, res) {
    res.render("allPokemon", {trainers: trainers});
}


module.exports = {
    trainers,
    getAllTrainers,
    newTrainer,
    getNewTrainer,
    viewTrainerPokemon,
    addPokemon,
    getAddPokemon,
    getPokemonDetails,
    getAllPokemon,
}

