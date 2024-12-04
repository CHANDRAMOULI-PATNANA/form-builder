const express = require('express');
const { createForm, getForm, submitResponse } = require('../controllers/formController');
const router = express.Router();

router.post('/', createForm);
router.get('/:id', getForm);
router.post('/:id/responses', submitResponse);

module.exports = router;
