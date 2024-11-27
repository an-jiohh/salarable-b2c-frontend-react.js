import React, { createContext, useRef, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const SetupContext = createContext();

export const SetupProvider = ({ children }) => {
  const { interviewId } = useParams();
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const streamRef = useRef(null);
  const questionRef = useRef(null);

  const [isConnected, setIsConnected] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState("None");
  const [questionCount, setQuestionCount] = useState(0);
  const [messages, setMessages] = useState("");
  const [history, setHistory] = useState({});
  const [keyword, setKeyword] = useState([]);
  const [score, setScore] = useState(0);
  const [mainContent, setMainContent] = useState("");

  return (
    <SetupContext.Provider
      value={{
        audioRef,
        videoRef,
        wsRef,
        isConnected,
        setIsConnected,
        currentQuestion,
        setCurrentQuestion,
        messages,
        setMessages,
        streamRef,
        questionRef,
        interviewId,
        history,
        setHistory,
        score,
        setScore,
        questionCount,
        setQuestionCount,
        currentAnswer,
        setCurrentAnswer,
        keyword,
        setKeyword,
        mainContent,
        setMainContent,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};

export default SetupContext;
