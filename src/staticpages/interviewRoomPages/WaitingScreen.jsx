import React, { useState, useEffect, useContext } from "react";
import SetupContext from "@/staticpages/interviewRoomPages/SetupProvider";

const WaitingScreen = ({ onNext, onEnd }) => {
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
    currentAnswer,
    setCurrentAnswer,
    interviewId,
    questionCount,
    setQuestionCount,
  } = useContext(SetupContext);

  const [initialized, setInitialized] = useState(false);

  const [displayText, setDisplayText] = useState("잠시만 기다려주세요");
  const [dot, setDot] = useState(".");

  useEffect(() => {
    const texts = [
      "잠시만 기다려주세요",
      "최대 2분까지 소요될 수 있어요.",
      "곧 시작합니다",
      "종료하지 말아주세요",
    ];
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
    console.log("fetch : ", questionCount, currentAnswer, currentQuestion);
    const sendPostRequest = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/interviews/${interviewId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              questions_count: questionCount,
              question: currentQuestion,
              answer: currentAnswer,
            }),
          }
        );
        const data = await response.json();
        setCurrentQuestion(data.questions);
        setInitialized(true);
        onNext();
      } catch (error) {
        console.error("Error:", error);
      }
    };

    sendPostRequest();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl text-center">{displayText}</h2>
      {/* <h2 className="text-3xl text-blue-500 text-center">{displayText}</h2> */}
      {/* <h2 className="text-3xl text-center">{dot}</h2> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        style={{
          shapeRendering: "auto",
          display: "block",
          background: "rgb(255, 255, 255)",
        }}
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <circle
            strokeLinecap="round"
            fill="none"
            strokeDasharray="32.98672286269283 32.98672286269283"
            stroke="#3b81f6"
            strokeWidth="8"
            r="21"
            cy="50"
            cx="50"
          >
            <animateTransform
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              dur="3.2258064516129035s"
              repeatCount="indefinite"
              type="rotate"
              attributeName="transform"
            />
          </circle>
        </g>
      </svg>
      {/* 여기에 오디오 또는 비디오 녹음 설정 추가 */}
    </div>
  );
};

export default WaitingScreen;
