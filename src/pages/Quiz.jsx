import React, { useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Quiz() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const quizFile = state?.quiz;

  const [data, setData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if(!quizFile){
      navigate('/');
    }
  }, [quizFile, navigate]);

  useEffect(() => {
    if(quizFile){
      fetch(`/quizzes/${quizFile}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setSelected(Array(json.questions.length).fill(null));
      })
      .catch((err) => console.err("Error loading quiz:", err));
    }
  }, [quizFile]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading quiz...</p>
      </div>
    );
  }

  const q = data.questions[current];
  const isLast = current === data.questions.length - 1;

  const goNext = () => setCurrent((c) => c + 1);

  const toHome = () => {
    navigate("/");
  }

  const handleSubmit = () => {
    const score = selected.reduce(
      (acc, ans, i) => acc + (ans === data.questions[i].answerIndex ? 1 : 0), 
      0
    );
  
    navigate("/results", {state: {score, total:data.questions.length, selected, questions: data.questions}});
  }


  return (
    <>
      <button className="border rounded-lg px-4 py-2 
          bg-blue-600 margin m-4 text-white"
          onClick={toHome}
      >
        home
      </button>

      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-semibold">{current + 1}/{data.questions.length}</h1>

        <h2 className="text-2xl font-semibold">{q.question}</h2>

        <div className="flex flex-col gap-3 w-full max-w-md">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                const updated = [...selected];
                updated[current] = i;
                setSelected(updated);
              }}
              className={`border rounded-lg py-2 ${
                selected[current] === i
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {opt} 
            </button>
          ))}
        </div>

        <div className="flex justify-between w-full max-w-md">
          <button
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={isLast ? handleSubmit : goNext}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isLast ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}
