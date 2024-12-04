import React, { useState } from 'react';

const FormEditor = () => {
  const [title, setTitle] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState('Categorize');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['']);
  const [answer, setAnswer] = useState('');

  const addQuestion = () => {
    setQuestions([...questions, { type: questionType, question: questionText, options, answer }]);
    setQuestionText('');
    setOptions(['']);
    setAnswer('');
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, headerImage, questions }),
    });

    if (response.ok) {
      console.log('Form submitted');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Create Form</h1>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Form Title" />
      <input type="text" value={headerImage} onChange={(e) => setHeaderImage(e.target.value)} placeholder="Header Image URL" />
      
      {questions.map((q, idx) => (
        <div key={idx}>
          <h3>{q.question}</h3>
          {q.options && q.options.map((opt, i) => <p key={i}>{opt}</p>)}
        </div>
      ))}

      <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
        <option value="Categorize">Categorize</option>
        <option value="Cloze">Cloze</option>
        <option value="Comprehension">Comprehension</option>
      </select>
      <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="Question Text" />
      {questionType === 'Categorize' && (
        <div>
          {options.map((opt, idx) => (
            <input key={idx} type="text" value={opt} onChange={(e) => {
              const newOptions = [...options];
              newOptions[idx] = e.target.value;
              setOptions(newOptions);
            }} placeholder={`Option ${idx + 1}`} />
          ))}
          <button onClick={() => setOptions([...options, ''])}>Add Option</button>
        </div>
      )}
      <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer" />
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  );
};

export default FormEditor;
