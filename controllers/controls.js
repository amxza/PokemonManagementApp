const pool = require("../db/pool");
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
    res.render("index", {title: "MainPage", trainee: trainee});
}

async function newTrainer(req, res) {
    res.render("trainers", {title: "New Trainer"});
}

async function getNewTrainer(req, res) {
    const { newTrainer } = req.body;
    // The query now returns the new row, so console.log won't be undefined
    const newTrainee = await db.addTrainer(newTrainer);
    console.log("New Trainer Added: ", newTrainee);
    res.redirect("/");
}

async function viewTrainerPokemon(req, res) {
    const trainerID = req.params.id;
    
    try {
        // 1. Get the list of Pokémon for this trainer from DB
        const pokemonList = await db.viewTrainersPokemon(trainerID);

        // 2. Get the trainer's name specifically to show in the header
        const trainerResult = await pool.query(
            "SELECT trainer_name FROM trainers WHERE id = $1", 
            [trainerID]
        );
        
        if (trainerResult.rows.length === 0) {
            return res.status(404).send("Trainer Not Found");
        }

        const trainerName = trainerResult.rows[0].trainer_name;

        // 3. Pass both to the view
        res.render("trainerPokemon", {
            trainerName: trainerName,
            pokemonList: pokemonList,
            trainerID: trainerID // Needed for the "Add Pokemon" link
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

async function addPokemon(req, res) {
    const trainerID = req.params.id;
    // We need the trainer's name/ID for the form's display and action
    const trainerResult = await pool.query("SELECT * FROM trainers WHERE id = $1", [trainerID]);
    const trainer = trainerResult.rows[0];

    // Pass the trainer as 'newPoke' to match your newPokemon.ejs variable name
    res.render("newPokemon", { newPoke: trainer });
}

async function getAddPokemon(req, res) {
    const trainerID = req.params.id;
    const { name, type, description } = req.body;

    try {
        await db.insertPokemon(trainerID, name, type, description);
        res.redirect(`/trainer/${trainerID}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving Pokemon");
    }
}

async function getPokemonDetails(req, res) {
    const { id, pokeId } = req.params;

    try {
        const trainerResult = await pool.query("SELECT * FROM trainers WHERE id = $1", [id]);
        const pokemon = await db.getPokemonById(pokeId);

        if (!trainerResult.rows[0] || !pokemon) {
            return res.status(404).send("Details not found");
        }

        res.render("pokemonDetails", { 
            trainer: trainerResult.rows[0], 
            pokemon: pokemon 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

async function getAllPokemon(req, res) {
    try {
        // Use a JOIN to get every pokemon and their trainer's name in one list
        const { rows } = await pool.query(`
            SELECT pokemon.*, trainers.trainer_name 
            FROM pokemon 
            JOIN trainers ON pokemon.trainer_id = trainers.id
        `);
        res.render("allPokemon", { allPokemon: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching all pokemon");
    }
}

async function removeTrainer(req, res) {
    const trainerID = req.params.id;
    try {
        await db.deleteTrainer(trainerID);
        res.redirect("/"); // Go back to the main list after deletion
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting trainer");
    }
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
    removeTrainer
}

