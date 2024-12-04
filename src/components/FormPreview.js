import React, { useEffect, useState } from 'react';

const FormPreview = ({ match }) => {
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      const response = await fetch(`http://localhost:5000/api/forms/${match.params.id}`);
      const data = await response.json();
      setForm(data);
    };

    fetchForm();
  }, [match.params.id]);

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:5000/api/forms/${match.params.id}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responses }),
    });

    if (response.ok) {
      console.log('Responses submitted');
    }
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1>{form.title}</h1>
      {form.headerImage && <img src={form.headerImage} alt="Header" />}
      
      {form.questions.map((q, idx) => (
        <div key={idx}>
          <h3>{q.question}</h3>
          {q.options && q.options.map((opt, i) => (
            <label key={i}>
              <input type="radio" name={`q${idx}`} value={opt} onChange={(e) => {
                const newResponses = [...responses];
                newResponses[idx] = e.target.value;
                setResponses(newResponses);
              }} />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Responses</button>
    </div>
  );
};

export default FormPreview;
