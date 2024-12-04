const Form = require('../models/Form');

const createForm = async (req, res) => {
  const { title, headerImage, questions } = req.body;

  try {
    const newForm = new Form({ title, headerImage, questions });
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const submitResponse = async (req, res) => {
  const { responses } = req.body;

  try {
    const form = await Form.findById(req.params.id);
    form.responses.push(responses);
    await form.save();
    res.status(201).json({ message: 'Response submitted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createForm, getForm, submitResponse };
