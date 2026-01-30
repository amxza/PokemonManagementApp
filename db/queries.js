// db/queries.js
const pool = require("./pool");

async function getTrainers() {
    const { rows } = await pool.query("SELECT * FROM trainers");
    return rows;   
};

async function addTrainer(trainer_name) {
    // Add RETURNING * to get the newly created trainer back
    const { rows } = await pool.query(
        "INSERT INTO trainers (trainer_name) VALUES ($1) RETURNING *", 
        [trainer_name]
    );
    return rows[0]; 
}

async function viewTrainersPokemon(trainer_id) {
    // FIX: Filter by trainer_id, not id
    const { rows } = await pool.query(
        "SELECT * FROM pokemon WHERE trainer_id = $1", 
        [trainer_id]
    );
    return rows;
}

// Get a single pokemon's full details
async function getPokemonById(pokeId) {
    const { rows } = await pool.query("SELECT * FROM pokemon WHERE id = $1", [pokeId]);
    return rows[0];
}

// Add a new pokemon linked to a specific trainer
async function insertPokemon(trainerId, name, type, description) {
    await pool.query(
        "INSERT INTO pokemon (name, type, description, trainer_id) VALUES ($1, $2, $3, $4)",
        [name, type, description, trainerId]
    );
}

async function deleteTrainer(trainerId) {
    // This will delete the trainer from the trainers table.
    // Because of 'ON DELETE CASCADE' in your schema, their pokemon will also be deleted! 
    await pool.query("DELETE FROM trainers WHERE id = $1", [trainerId]);
}

module.exports = {
    getTrainers,
    addTrainer,
    viewTrainersPokemon,
    getPokemonById,
    insertPokemon,
    deleteTrainer
};