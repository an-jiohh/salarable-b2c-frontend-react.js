import React, { useState, useEffect, useContext } from "react";
import SetupContext from "@/pages/interviewRoomComponent/SetupProvider";

const EndWaitingScreen = ({ onEnd }) => {
  const {
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
    score,
    setScore,
    history,
    setHistory,
  } = useContext(SetupContext);

  const [displayText, setDisplayText] = useState("잠시만 기다려주세요");
  const [dot, setDot] = useState(".");

  useEffect(() => {
    const texts = ["잠시만 기다려주세요", "종료하지말아주세요"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      console.log(texts[index]);
      setDisplayText(texts[index]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dots = [".", "..", "..."];
    let dotIndex = 0;
    const dotInterval = setInterval(() => {
      dotIndex = (dotIndex + 1) % dots.length;
      setDot(dots[dotIndex]);
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: "INTERVIEW_END" }));
    }
  }, [wsRef]);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "interview_complete") {
          setScore(data.score);
          setHistory(data.history);
          onEnd();
        }
      };
    }
  }, [onEnd, setCurrentQuestion, setMessages, wsRef]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl text-center">{displayText}</h2>
      <h2 className="text-3xl text-center">{dot}</h2>
      {/* 여기에 오디오 또는 비디오 녹음 설정 추가 */}
    </div>
  );
};

export default EndWaitingScreen;
