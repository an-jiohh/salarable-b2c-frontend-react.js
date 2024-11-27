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
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [messages, setMessages] = useState("");
  const [history, setHistory] = useState({});
  const [score, setScore] = useState(0);

  // 공유 함수 기입
  const setupWebSocket = () => {
    wsRef.current = io(`${import.meta.env.VITE_SOCKET_API_URL}`, {
      path: `/ws/interview/${interviewId}`,
    });

    wsRef.current.on("connect", () => {
      setIsConnected(true);
      console.log("웹소켓 연결됨");
    });

    wsRef.current.on("message", (data) => {
      if (data.type === "question") {
        setCurrentQuestion(data.content);
      }
      setMessages((prev) => [...prev, data]);
    });

    wsRef.current.on("disconnect", () => {
      setIsConnected(false);
      console.log("웹소켓 연결 종료");
    });
  };

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
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};

export default SetupContext;
