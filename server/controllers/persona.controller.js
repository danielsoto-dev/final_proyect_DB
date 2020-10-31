const db = require('../database');

const personaCrtll = {};

personaCrtll.getPersonas = async (req, res) => {
  const id = req.params.id;
  try {
    const query = 'SELECT * FROM persona;';
    const result = await db.query(query);
    res.send(result);
  } catch (e) {
    console.log('Error', e);
  }
};

personaCrtll.getPersonaById = async (req, res) => {
  const id = req.params.id;
  try {
    const query = id
      ? `SELECT * FROM persona WHERE id = ${id};`
      : 'SELECT * FROM persona;';
    const result = await db.query(query);
    res.send(result);
  } catch (e) {
    console.log('Error', e);
  }
};

personaCrtll.getPersonaByName = async (req, res) => {
  const name = req.params.name;
  try {
    const query = name
      ? `SELECT * FROM persona WHERE nombre like '${name}%';`
      : 'SELECT * FROM persona;';
    const result = await db.query(query);
    res.send(result);
  } catch (e) {
    console.log('Error', e);
  }
};
module.exports = personaCrtll;
