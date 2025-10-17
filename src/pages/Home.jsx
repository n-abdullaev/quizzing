import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const startQuiz = () => {
        navigate("/catalog")
    };

    return(
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <h1 className="text-3xl font-bold mb-6">Welcome to Quizzing!</h1>
                    <button 
                        onClick={startQuiz}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"> 
                        Start Quiz </button>
            </div>
        </>
    );
}
export default Home;