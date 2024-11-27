// pages/InterviewPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InterviewPages = () => {
  const navigate = useNavigate();

  const startInterview = async () => {
    try {
      // 면접 시작 정보를 서버로 전송
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/interviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: "user",
            timestamp: new Date().toISOString(),
          }),
        }
      );

      const { interviewId } = await response.json();

      // 면접실 페이지로 이동
      navigate(`/interviewroom/${interviewId}`);
    } catch (error) {
      console.error("Failed to start interview:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">실전모의면접</h1>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8 space-y-6">
              <h2 className="text-xl font-semibold mb-4">면접 시작하기</h2>
              <Button onClick={startInterview} className="w-48">
                새로운 면접 시작
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterviewPages;
