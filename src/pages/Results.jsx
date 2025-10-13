import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Guard: if someone opens /results directly, send them home
  if (!state) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center">
          <p className="mb-4">No results to show.</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const { score, total, questions, selected } = state;
  const percent = Math.round((score / total) * 100);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Your Results</h1>
      <p className="text-gray-600 mb-6">
        {score}/{total} • {percent}%
      </p>

      <div className="space-y-4">
        {questions.map((q, i) => {
          const userPick = selected[i];                // index or null
          const correct = q.answerIndex;               // index
          const isCorrect = userPick === correct;

          return (
            <div key={q.id ?? i} className="rounded-lg border p-4">
              <p className="font-medium mb-2">
                {i + 1}. {q.question}
              </p>

              {/* Your answer */}
              <p className={isCorrect ? "text-emerald-600" : "text-red-600"}>
                Your answer:{" "}
                {userPick == null ? "— (no answer)" : q.options[userPick]}
                {isCorrect ? " ✓" : " ✗"}
              </p>

              {/* Correct answer (show when wrong or unanswered) */}
              {!isCorrect && (
                <p className="text-emerald-700">
                  Correct: {q.options[correct]}
                </p>
              )}

              {/* Optional explanation */}
              {q.explanation && (
                <p className="text-gray-600 mt-2">{q.explanation}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate("/quiz")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retake Quiz
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Home
        </button>
      </div>
    </div>
  );
}
