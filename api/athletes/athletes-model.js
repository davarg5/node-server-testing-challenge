const db = require('./../../data/dbConfig');

module.exports = {
    getAll,
    getById,
    create,
    remove
}

function getAll() {
    return db('athletes');
}

function getById(id) {
    return db('athletes').where('id', id).first();
}

async function create(athlete) {
    const newId = await db('athletes').insert(athlete);
    return db('athletes').where('id', newId).first();
}
 
async function remove(id) {
    const deletedAthlete = await db('athletes').where('id', id);
    await db('athletes').where('id', id).del()
    return deletedAthlete;
} 