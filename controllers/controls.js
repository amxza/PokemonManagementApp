
const trainers = [
    {
        trainerName: "Ash",
        id: 1,
        pokemon: [
            {name: "Pikachu", type: "Electric", description: "A yellow Mouse Pokemon"},
            {name: "Charizard", type: "Fire", description: "A Fire Dragon Pokemon"},
            {name: "Squirtle", type: "Water", description: "A water turtle pokemon"},
        ],
    },
    {
        trainerName: "Misty",
        id: 2,
        pokemon: [
            {name: "Togepi", type: "Normal", description: "The Eggshell Pokemon"},
            {name: "Psyduck", type: "Water", description: "THe Duck Pokemon"},
        ],
    },
    {
        trainerName: "Brock",
        id: 3,
        pokemon: [
            {name: "Onix", type: "Rock", description: "The Rock Snake Pokemon"},
        ],
    },
];

async function getAll(req, res) {
    res.render("index", {title: "MainPage", trainers: trainers});
}

async function newTrainer(req, res) {
    res.render("trainers", {title: "New Trainer"});
}

async function getNewTrainer(req, res) {
    const newTrainer = req.body.newTrainer
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


module.exports = {
    trainers,
    getAll,
    newTrainer,
    getNewTrainer,
    viewTrainerPokemon,
}

