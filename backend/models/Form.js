const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  title: String,
  headerImage: String,
  questions: [
    {
      type: { type: String },
      question: String,
      options: [String],
      answer: String,
      image: String,
    }
  ],
  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Response'
    }
  ],
});

module.exports = mongoose.model('Form', FormSchema);
