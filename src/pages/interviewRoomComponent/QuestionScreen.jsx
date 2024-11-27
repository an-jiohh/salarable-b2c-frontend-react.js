import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import SetupContext from "@/pages/interviewRoomComponent/SetupProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Car } from "lucide-react";

const QuestionScreen = ({ onNext }) => {
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
    questionRef,
  } = useContext(SetupContext);
  const [time, setTime] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [waveHeights, setWaveHeights] = useState(Array(12).fill(8));

  const handleRecordButtonClick = () => {
    if (isRecording) {
      // 녹화 중지
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // 1초 후에 종료 메시지 전송
      setTimeout(() => {
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: "END" }));
        }
      }, 1000);

      onNext();
    } else {
      // 녹화 시작
      const stream = streamRef.current;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeTypes: "video/webm;codecs=vp9,opus",
      });

      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (
          event.data.size > 0 &&
          wsRef.current.readyState === WebSocket.OPEN
        ) {
          const arrayBuffer = await event.data.arrayBuffer();
          wsRef.current.send(event.data);
        }
      };

      mediaRecorderRef.current.start(100); // 100ms마다 데이터를 전송
      setIsRecording(true);
    }
  };

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRecording && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // useEffect(() => {
  //   const handleAudio = async () => {
  //     try {
  //       const audioContext = new (window.AudioContext ||
  //         window.webkitAudioContext)();
  //       const analyser = audioContext.createAnalyser();
  //       const source = audioContext.createMediaStreamSource(streamRef.current);
  //       source.connect(analyser);
  //       analyser.fftSize = 128;
  //       const bufferLength = analyser.frequencyBinCount;
  //       const dataArray = new Uint8Array(bufferLength);

  //       const updateWaveHeights = () => {
  //         analyser.getByteFrequencyData(dataArray);
  //         const newHeights = Array.from(dataArray)
  //           .slice(0, 12)
  //           .map((value) => (value / 255) * 24 + 8);
  //         setWaveHeights(newHeights);

  //         requestAnimationFrame(updateWaveHeights);
  //       };
  //       setTimeout(updateWaveHeights, 100);
  //       updateWaveHeights();
  //     } catch (err) {
  //       console.error("Error accessing microphone", err);
  //     }
  //   };

  //   handleAudio();
  // }, []);

  console.log(waveHeights);

  useEffect(() => {
    console.log("streamRef.current", streamRef.current);
    console.log("videoRef.current", videoRef.current);
    console.log("audioRef.current", audioRef.current);
    if (videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
    if (audioRef.current) {
      audioRef.current.srcObject = streamRef.current;
    }
  }, [streamRef, videoRef, audioRef]);

  return (
    <div className="pt-[98px] h-screen flex flex-col justify-between">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center gap-3 w-full">
          <div className="flex-shrink-0">
            <div className="rounded-full bg-blue-200 p-3 flex items-center justify-center">
              {/* <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="currentColor"
              >
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" /> */}
              <img
                src="/chatbot.png"
                alt="Description of image"
                className="w-12 h-12"
              />
            </div>
          </div>
          <div className="flex-grow bg-white dark:bg-gray-800 rounded-bl-2xl rounded-r-2xl border border-gray-200 dark:border-gray-700">
            <div className="p-4">
              <div className="mb-2 text-lg font-semibold text-[#5865F2] dark:text-[#7289da]">
                자격요건 - TypeScript 관련 질문
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <div>{messages}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <div className="h-full flex justify-center items-center ">
          <div className=" bg-gray-200 rounded-3xl relative mb-[31px]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="object-cover rounded-3xl"
            />
            <div className="absolute w-full -translate-y-[31px]">
              <div className="max-w-xl mx-auto w-[440px] bg-white rounded-full shadow-lg flex items-center justify-around p-3 border border-gray-200">
                {/* Recording Icon and Time */}
                <div className="flex items-center gap-3">
                  {isRecording ? (
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-red-100" />
                  )}
                  <span className="text-gray-700">
                    {isRecording ? "녹음중" : "대기중"}
                  </span>
                  <span className="text-gray-500">{formatTime(time)}</span>
                </div>

                {/* Audio Waveform */}
                <div className="flex items-center justify-center gap-[6px] h-8">
                  {waveHeights.map((_, i) => (
                    <div
                      key={`wave-${i}`}
                      className="w-[5px] bg-blue-400 rounded-full animate-wave"
                      style={{
                        height: `${_}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Stop Button */}
                <Button
                  onClick={handleRecordButtonClick}
                  className="bg-blue-500 text-white px-6 py-1.5 rounded-full hover:bg-blue-600 transition-colors"
                >
                  {isRecording ? "답변 마치기" : "답변 시작"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
