
const trainers = [
    {
        trainerName: "Ash",
        id: Date.now().toString(),
        pokemon: ["Pikachu", "Charizard", "Squirtle"]
    },
    {
        trainerName: "Misty",
        id: Date.now().toString(),
        pokemon: ["Togepi", "Psyduck"]
    },
    {
        trainerName: "Brock",
        id: Date.now().toString(),
        pokemon: ["Onix"]
    }
]

async function getAll(req, res) {
    res.render("index", {title: "MainPage", trainers: trainers});
}

async function newTrainer(req, res) {
    res.render("trainers", {title: "New Trainer"});
}

async function getNewTrainer(req, res) {
    const newTrainer = req.body.newTrainer
    trainers.push({trainerName: newTrainer, id: Date.now().toString(), pokemon: []});
    res.redirect("/");
}

async function viewTrainerPokemon(req, res) {
    
}


module.exports = {
    trainers,
    getAll,
    newTrainer,
    getNewTrainer,
}