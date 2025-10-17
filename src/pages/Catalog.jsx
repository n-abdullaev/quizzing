import React from "react";
import { useNavigate } from "react-router-dom";
import data from "../quizzes/catalog.json";

export default function Catalog() {
  const navigate = useNavigate();

  const startQuiz = (quizFile) => {
    navigate("/quiz", { state: { quiz: quizFile } });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold">Choose a Quiz</h1>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {data.quizzes.map((opt, i) => (
          <button
            key={i}
            className="border rounded-lg py-2 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => startQuiz(opt.file)}
          >
            {opt.title}
          </button>
        ))}
      </div>
    </div>
  );
}
