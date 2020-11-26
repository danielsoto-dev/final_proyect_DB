const db = require('../database');

const personaCrtll = {};

personaCrtll.getEstudiantes = async (req, res) => {
  const id = req.params.id;
  try {
    const query = 'SELECT * FROM estudiante;';
    const result = await db.query(query);
    res.send(result);
  } catch (e) {
    console.log('Error', e);
  }
};

personaCrtll.getEstudianteById = async (req, res) => {
  const id = req.params.id;
  try {
    const query = id
      ? `SELECT * FROM estudiante WHERE codigo = ${id};`
      : 'SELECT * FROM estudiante;';
    const result = await db.query(query);
    res.send(result);
  } catch (e) {
    console.log('Error', e);
  }
};
let queryByIdProyectadas = `SELECT asignatura.materia,asignatura.cursos AS nrc, asignatura.nombre AS nombreAsignatura, asignatura.Estatus AS tipo, hora.dia, hora.hora, docente.nombre AS nombreProfesor
FROM estudiante 
	INNER JOIN plan_estudio
		ON estudiante.id_plan_estudio = plan_estudio.id
	INNER JOIN contiene
		ON plan_estudio.id = contiene.id_plan_estudio
	INNER JOIN asignatura
		ON contiene.id_asignatura = asignatura.codigo
	INNER JOIN curso
		ON asignatura.cursos = curso.NRC	
	INNER JOIN hora
		ON curso.NRC = hora.nrc_curso
	INNER JOIN dicta
		ON hora.nrc_curso = dicta.nrc_curso
	INNER JOIN docente
		ON dicta.codigo_profesor = docente.codigo				
	WHERE estudiante.codigo = ?`;

personaCrtll.getProyectadasById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(queryByIdProyectadas, [id]);
    res.send(result);
  } catch (e) {
    console.log('Error', e);
  }
};
module.exports = personaCrtll;
