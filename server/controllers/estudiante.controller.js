const db = require('../database');

const personaCrtll = {};

personaCrtll.getEstudiantes = async (req, res) => {
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
let queryByIdProyectadas = `SELECT DISTINCT  estudiante.codigo, asignatura.materia, asignatura.cursos AS nrc, curso.NRC AS curso, asignatura.codigo ,asignatura.nombre AS nombreAsignatura, asignatura.numero_creditos AS creditos,asignatura.estatus AS tipo, hora.dia, hora.hora, docente.nombre AS nombreProfesor, contiene.semestre AS semestreAsig
FROM estudiante
    INNER JOIN plan_estudio
            ON estudiante.id_plan_estudio = plan_estudio.id
    INNER JOIN contiene
            ON plan_estudio.id = contiene.id_plan_estudio
    INNER JOIN asignatura
            ON contiene.id_asignatura = asignatura.codigo
    INNER JOIN curso
            ON asignatura.codigo = curso.id_asignatura
    INNER JOIN hora
            ON curso.NRC = hora.nrc_curso
    INNER JOIN dicta
            ON hora.nrc_curso = dicta.nrc_curso
    INNER JOIN docente
            ON dicta.codigo_profesor = docente.codigo
    INNER JOIN cursado
    			ON estudiante.codigo = cursado.id_estudiantes
    WHERE estudiante.codigo = ? AND contiene.semestre <= estudiante.semestre + 2 AND (contiene.id_prerequisito = cursado.id_asignatura OR contiene.id_prerequisito IS NULL)
    
EXCEPT
	SELECT distinct estudiante.codigo, asignatura.materia, asignatura.cursos AS nrc, curso.NRC AS curso, asignatura.codigo ,asignatura.nombre AS nombreAsignatura, asignatura.numero_creditos AS creditos,asignatura.estatus AS tipo, hora.dia, hora.hora, docente.nombre AS nombreProfesor, contiene.semestre AS semestreAsig
	FROM estudiante
    	 INNER JOIN cursado
    				ON estudiante.codigo = cursado.id_estudiantes
	    INNER JOIN asignatura
               ON cursado.id_asignatura = asignatura.codigo
	    INNER JOIN curso
	            ON asignatura.codigo = curso.id_asignatura
	    INNER JOIN hora
	            ON curso.NRC = hora.nrc_curso
	    INNER JOIN dicta
	            ON hora.nrc_curso = dicta.nrc_curso
	    INNER JOIN docente
	            ON dicta.codigo_profesor = docente.codigo
	    INNER JOIN contiene
	            ON cursado.id_asignatura = contiene.id_asignatura
	    WHERE estudiante.codigo = ?;
`;

personaCrtll.getProyectadasById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(queryByIdProyectadas, [id, id]);
    res.send(result);
  } catch (e) {
    console.log('Error', e);
  }
};

let baseInsert = '';
personaCrtll.postHorario = async (req, res) => {
  try {
    const { body } = req;
    console.log('Nrcs', body);
    //const result = await db.query(baseInsert, [id);
    res.send(body);
  } catch (e) {
    console.log('Error', e);
  }
};
module.exports = personaCrtll;
