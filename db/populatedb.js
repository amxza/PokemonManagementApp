require("dotenv").config();
const {Client} = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS trainers (
    id SERIAL PRIMARY KEY,
    trainer_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pokemon(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    description TEXT,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE
);

INSERT INTO trainers (trainer_name) 
VALUES ('Ash'), ('Misty'), ('Brock');


INSERT INTO pokemon (name, type, description, trainer_id) VALUES 
('Pikachu', 'Electric', 'A yellow Mouse Pokemon', (SELECT id FROM trainers WHERE trainer_name = 'Ash')),
('Charizard', 'Fire', 'A Fire Dragon Pokemon', (SELECT id FROM trainers WHERE trainer_name = 'Ash')),
('Squirtle', 'Water', 'A water turtle pokemon', (SELECT id FROM trainers WHERE trainer_name = 'Ash')),
('Togepi', 'Normal', 'The Eggshell Pokemon', (SELECT id FROM trainers WHERE trainer_name = 'Misty')),
('Psyduck', 'Water', 'The Duck Pokemon', (SELECT id FROM trainers WHERE trainer_name = 'Misty')),
('Onix', 'Rock', 'The Rock Snake Pokemon', (SELECT id FROM trainers WHERE trainer_name = 'Brock'));
`;

async function main() {
    console.log("seeding...")
    const client = new Client({
        connectionString: process.env.DB_CONNECTIONSTRING,
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Done");
}

main();