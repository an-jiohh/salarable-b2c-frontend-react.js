import React, { useState, useEffect, useContext } from "react";
import SetupContext from "@/staticpages/interviewRoomPages/SetupProvider";

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
    questionCount,
    interviewId,
    keyword,
    setKeyword,
    mainContent,
    setMainContent,
  } = useContext(SetupContext);

  const [displayText, setDisplayText] = useState("잠시만 기다려주세요");
  const [dot, setDot] = useState(".");
  const [initialized, setInitialized] = useState(false);

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
    if (initialized) return;
    const sendPostRequest = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/interviews/${interviewId}/end`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              questions_count: questionCount,
            }),
          }
        );
        const data = await response.json();
        setHistory(data.history);
        setKeyword(data.keyword);
        setMainContent(data.mainContent);
        setInitialized(true);
        onEnd();
      } catch (error) {
        console.error("Error:", error);
      }
    };

    sendPostRequest();
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
