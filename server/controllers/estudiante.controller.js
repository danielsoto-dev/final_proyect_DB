const db = require('../database');

const personaCrtll = {};
let queryHorarios = `SELECT DISTINCT horario.Id , asignatura.materia , curso.NRC, hora.dia, hora.hora
    FROM estudiante
         INNER JOIN horario
              ON estudiante.codigo = horario.id_estudiante
        INNER JOIN nrcs
               ON horario.id = nrcs.id_horario
        INNER JOIN curso
                ON nrcs.nrc_curso = curso.NRC
        INNER JOIN hora
                ON curso.NRC = hora.nrc_curso
        INNER JOIN asignatura
                    ON curso.id_asignatura = asignatura.codigo
        WHERE estudiante.codigo = ?`;
personaCrtll.getHorariosGuardados = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(queryHorarios, [id]);
    res.send(result);
  } catch (e) {
    console.log('Error', e);
  }
};

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
let queryByIdProyectadas = `SELECT DISTINCT  estudiante.codigo, asignatura.materia, asignatura.cursos AS nrc, curso.NRC AS curso, asignatura.codigo ,asignatura.nombre AS nombreAsignatura, asignatura.numero_creditos AS creditos, hora.dia, hora.hora, docente.nombre AS nombreProfesor, contiene.semestre AS semestreAsig, docente.codigo AS codDoc
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
	SELECT distinct estudiante.codigo, asignatura.materia, asignatura.cursos AS nrc, curso.NRC AS curso, asignatura.codigo ,asignatura.nombre AS nombreAsignatura, asignatura.numero_creditos AS creditos, hora.dia, hora.hora, docente.nombre AS nombreProfesor, contiene.semestre AS semestreAsig, docente.codigo AS codDoc
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

let baseInsert = 'INSERT INTO horario (id_estudiante) VALUES(?) ';
let insertarNRC = 'INSERT INTO nrcs (id_horario, nrc_curso) VALUES ?;';
personaCrtll.postHorario = async (req, res) => {
  try {
    const { body } = req;
    const { NRC_list: list, id } = body;
    console.log('id', id);
    console.log('list', list);
    //? Query para insertar a la tabla horario
    let result = await db.query(baseInsert, [id]);
    console.log('result', result);
    let { insertId } = result;
    //? Query para insertar a la tabla nrcs
    result = null;
    let values = [];
    body.NRC_list.forEach((element, idx) => {
      values.push([insertId, element]);
    });
    console.log('values', values);
    result = await db.query(insertarNRC, [values]);
    res.send(body);
  } catch (e) {
    console.log('Error', e);
  }
};
module.exports = personaCrtll;
