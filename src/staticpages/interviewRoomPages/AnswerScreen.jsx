import React, { useState } from "react";
import { useContext } from "react";
import SetupContext from "@/staticpages/interviewRoomPages/SetupProvider";

const AnswerScreen = ({ onComplete }) => {
  const { audioRef, videoRef, wsRef } = useContext(SetupContext);
  return (
    <div>
      <h2>답변 화면</h2>
      {/* 여기에 오디오 또는 비디오 녹음 설정 추가 */}
      <button onClick={onComplete}>다음 질문</button>
    </div>
  );
};

export default AnswerScreen;
