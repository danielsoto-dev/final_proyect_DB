const { Router } = require('express');
const {
  getPersonaById,
  getPersonaByName,
  getPersonas,
} = require('../controllers/persona.controller');
const router = Router();

router.route('/').get(getPersonas);
router.route('/id/:id').get(getPersonaById);
router.route('/name').get(getPersonaByName);

module.exports = router;
