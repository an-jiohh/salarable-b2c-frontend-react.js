import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PartnershipPage = () => {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">제휴서비스 신청</h1>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-4">제휴 서비스</h2>
              <Button>제휴 신청하기</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnershipPage;
