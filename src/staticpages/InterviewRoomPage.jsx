import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WaitingScreen from "@/staticpages/interviewRoomPages/WaitingScreen";
import AnswerScreen from "@/staticpages/interviewRoomPages/AnswerScreen";
import QuestionScreen from "@/staticpages/interviewRoomPages/QuestionScreen";
import SetupScreen from "@/staticpages/interviewRoomPages/SetupScreen";
import EndScreen from "@/staticpages/interviewRoomPages/EndScreen";
import CreateQuestionScreen from "@/staticpages/interviewRoomPages/CreateQuestionScreen";
import EndWaitingScreen from "@/staticpages/interviewRoomPages/EndWaitingScreen";
import SetupContext, {
  SetupProvider,
} from "@/staticpages/interviewRoomPages/SetupProvider";
import TrackingScreen from "./interviewRoomPages/TrackingScreen";
import { useNavigate } from "react-router-dom";

const InterviewRoom = () => {
  const [currentStep, setCurrentStep] = useState("createquestion");
  const [questionIndex, setQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/personal/interview");
  };

  const handleNext = () => {
    if (currentStep === "createquestion") {
      setCurrentStep("setup");
    }
    if (currentStep === "setup") {
      setCurrentStep("tracking");
    } else if (currentStep === "tracking") {
      setCurrentStep("waiting");
    } else if (currentStep === "question") {
      setCurrentStep("waiting");
    } else if (currentStep === "waiting") {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setCurrentStep("question");
    } else if (currentStep === "answer") {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setCurrentStep("question");
    }
  };

  const handleEnd = () => {
    setCurrentStep("end");
  };

  const exitInterview = () => {
    setCurrentStep("endWatingScreen");
  };

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    // <div className="min-h-screen bg-gray-50 flex flex-col items-center">
    <div className="min-h-screen  flex flex-col items-center">
      <nav className="fixed top-0 border-b bg-white w-full">
        <div className="mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold" onClick={handleClick}>
            Salarable
          </div>
          <div className="p-2">대화형 모의면접</div>
          <Button onClick={exitInterview}>종료하기</Button>
        </div>
      </nav>
      <SetupProvider>
        <div className="flex-grow flex flex-col items-center justify-center w-full h-full">
          {currentStep === "createquestion" && (
            <CreateQuestionScreen onNext={handleNext} />
          )}
          {currentStep === "setup" && <SetupScreen onNext={handleNext} />}
          {currentStep === "question" && <QuestionScreen onNext={handleNext} />}
          {currentStep === "waiting" && (
            <WaitingScreen onNext={handleNext} onEnd={handleEnd} />
          )}
          {currentStep === "answer" && <AnswerScreen onComplete={handleNext} />}
          {currentStep === "end" && <EndScreen onNext={handleNext} />}
          {currentStep === "endWatingScreen" && (
            <EndWaitingScreen onEnd={handleEnd} />
          )}
          {currentStep === "tracking" && <TrackingScreen onNext={handleNext} />}
        </div>
      </SetupProvider>
    </div>
  );
};

export default InterviewRoom;
