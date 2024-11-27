// pages/FeedbackPage.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FeedbackPage = () => {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">의견을 들려주세요</h1>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-4">피드백</h2>
              <Button>의견 작성하기</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackPage;
