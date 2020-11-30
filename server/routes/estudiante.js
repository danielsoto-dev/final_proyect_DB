const { Router } = require('express');
const {
  getEstudianteById,
  getProyectadasById,
  postHorario,
  // getEstudiantesByName,
  getEstudiantes,
} = require('../controllers/estudiante.controller');
const router = Router();

router.route('/').get(getEstudiantes);
router.route('/id/:id').get(getEstudianteById);
router.route('/proyectadas/:id').get(getProyectadasById);
router.route('/horarios/:id').post(postHorario);
// router.route('/name').get(getEstudiantesByName);

module.exports = router;
