const pool = require("./pool");

async function getTrainers() {
    const {rows} = await pool.query("SELECT * FROM trainers");
    return rows;   
};

async function addTrainer(trainer_name) {
    await pool.query("INSERT INTO trainers (trainer_name) VALUES ($1)", [trainer_name]);
}


module.exports = {
    getTrainers,
    addTrainer,
};