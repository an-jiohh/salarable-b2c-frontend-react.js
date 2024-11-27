import React, { useState, useEffect, useContext } from "react";
import SetupContext from "@/staticpages/interviewRoomPages/SetupProvider";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { Navigate } from "react-router-dom";

const EndScreen = ({ onNext }) => {
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
    history,
    setHistory,
    score,
    setScore,
    keyword,
    setKeyword,
    mainContent,
    setMainContent,
  } = useContext(SetupContext);

  const totalscore = Math.round(
    (keyword.reduce((acc, item) => acc + item.score, 0) /
      (keyword.length * 5)) *
      100
  );
  const chartData = [
    { month: "january", mobile: totalscore, desktop: 100 - totalscore },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#EFEFF4",
    },
    mobile: {
      label: "Mobile",
      color: "#4C80F1",
    },
  };
  // const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  console.log(history);
  console.log(keyword);

  const chartData2 = keyword;

  const chartConfig2 = {
    score: {
      label: "score",
      color: "#4C80F1",
    },
  };

  const bulan = Math.floor(Math.random() * 21) + 20;
  const sinrul = 0;
  const barChartData = [
    { month: "불안도", desktop: bulan },
    { month: "신뢰도", desktop: sinrul },
  ];

  const barChartConfig = {
    desktop: {
      label: "Desktop",
      color: "#4C80F1",
    },
  };

  return (
    <div className="pt-[72px] flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto p-8">
        <div className="space-y-6">
          {/* 이메일 결과 섹션 */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-medium">
              User님의 모의면접 결과입니다.
            </h2>
            <p className="text-gray-500">
              결과는 [분석결과 {">"} 대화형 면접 연습] 에서 다시 확인할 수
              있어요
            </p>
          </div>

          {/* 답변 요약 카드 */}
          <Card className="bg-white">
            <CardContent className="p-6 pb-0">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="text-3xl font-bold">총평</h3>
                  <p className="mt-6 text-gray-600 whitespace-pre-line">
                    {mainContent}
                  </p>
                </div>
              </div>
            </CardContent>
            {/* 점수 그래프 */}
            <CardContent className="flex justify-around items-center pb-0">
              <ChartContainer
                config={chartConfig}
                className="aspect-square w-full max-w-[250px] mt-[105px]"
              >
                <RadialBarChart
                  data={chartData}
                  endAngle={180}
                  innerRadius={100}
                  outerRadius={140}
                >
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 16}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {chartData[0].mobile}
                              </tspan>
                              <tspan className="fill-foreground text-xl font-bold">
                                {" "}
                                %
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 4}
                                className="text-gray-600 text-xs font-medium"
                              >
                                합격 가능성
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                  <RadialBar
                    dataKey="desktop"
                    stackId="a"
                    cornerRadius={0}
                    fill="var(--color-desktop)"
                    className="stroke-transparent stroke-2"
                  />
                  <RadialBar
                    dataKey="mobile"
                    fill="var(--color-mobile)"
                    stackId="a"
                    cornerRadius={0}
                    className="stroke-transparent stroke-2"
                  />
                </RadialBarChart>
              </ChartContainer>
              {/* 항목 그래프 */}
              <ChartContainer
                config={chartConfig2}
                className="aspect-square max-h-[250px] min-w-[250px]"
              >
                <RadarChart data={chartData2}>
                  <PolarAngleAxis dataKey="keyword" />
                  <PolarRadiusAxis
                    domain={[0, 5]}
                    axisLine={false}
                    tick={false}
                    tickLine={true}
                    // ticks={[]}
                  />
                  <PolarGrid gridCount={5} />
                  <Radar
                    dataKey="score"
                    fill="var(--color-score)"
                    fillOpacity={0.8}
                  />
                </RadarChart>
                {/* <div className="text-gray-600 text-sm font-medium flex justify-center">
                  항목당 점수
                </div> */}
              </ChartContainer>
              <ChartContainer
                config={barChartConfig}
                className="max-w-[250px] min-w-[100px] max-h-[300px] min-h-[250px]"
              >
                <BarChart
                  accessibilityLayer
                  data={barChartData}
                  margin={{
                    right: 20, // 오른쪽 여백 추가
                    left: -35, // 왼쪽 여백 추가
                  }}
                >
                  <CartesianGrid
                    vertical={false}
                    horizontal={false}
                    // strokeDasharray="3 3"
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 10)}
                  />
                  <YAxis
                    domain={[0, 100]} // 최소값 0, 최대값 100으로 설정
                    tickCount={5} // 눈금 개수 설정
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                  />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={0}
                    barSize={60}
                  >
                    <LabelList
                      position="top"
                      offset={16}
                      className="fill-foreground"
                      fontSize={12}
                      formatter={(value) => `${value}%`}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 발견된 경험 카드 */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">면접 결과</h3>
              <div className="space-y-6">
                {history.map((item, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="flex justify-between items-center text-lg font-semibold text-gray-800">
                        <MessageCircle className="w-6 h-6 text-blue-500 mr-3" />
                        {item.question}
                      </h3>
                    </div>
                    <div className="rounded-md ml-8 p-2 text-gray-600 mb-2">
                      {item.answer}
                    </div>
                    <hr className="border-t-4 ml-8 border-gray-200 mb-2" />
                    <div className="flex justify-left ml-8">
                      <span className="pl-6 w-1/12 text-blue-600 flex items-center font-bold">
                        {item.score}점
                      </span>
                      <p className="w-11/12 rounded-md ml-4 flex items-center text-gray-600  ">
                        {item.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 답변 요약 카드 */}
          {/* <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium">문제해결 역량</h3>
                  <p className="mt-2 text-gray-600">
                    {mockResult.sections[0].content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* 보완점 섹션 */}
          {/* <Card className="bg-white">
            <CardContent className="p-6">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  지원자는 프로젝트 수행 과정에서 의견 차이가 발생했을 때, 이를
                  해결하기 위해 팀장으로서 적극적으로 나서서 문제를
                  해결하였습니다. 이는 문제해결 능력을 보여주는 좋은 사례입니다.
                  그러나, 어떤 방식으로 각 팀원의 의견을 수용하고, 이를 어떻게
                  종합하여 판단을 내렸는지에 대한 구체적인 내용이 부족합니다.
                  또한, 프론트엔드와 백엔드의 작업 범위를 어떻게 결정했는지,
                  그리고 이를 통해 어떤 결과를 도출하였는지에 대한 설명이
                  필요합니다.
                </p>
              </div>
            </CardContent>
          </Card> */}

          {/* 종합 의견 섹션 */}
          {/* <Card className="bg-white">
            <CardContent className="p-6">
              <h3 className="font-medium flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                종합 의견을 보고 자기소개서에 응용해 보세요
              </h3>
              <p className="text-gray-600">
                지원자는 프로젝트 수행 과정에서 발생한 의견 차이와 그 해결
                경험에 대해 잘 설명하였습니다. 특히, 프론트엔드와 백엔드가 어느
                쪽에 데이터 처리를 담당할지에 대한 문제를 논리적으로 분석하고,
                이를 해결하기 위한 방법을 도출하였다는 점이 인상적입니다. 이를
                통해 지원자가 문제의 원인을 파악하고 이를 해결하기 위해
                적극적으로 행동하는 능력을 가지고 있음을 동료 상황에서 최적의
                대안을 선정하고 이를 실행하는 능력 역시 보여주었습니다. 이러한
                능력은 팀 프로젝트에서 중요한 역할로, 지원자의 팀워크와 역량을
                잘 수행할 수 있을 것으로 기대됩니다.
              </p>
            </CardContent>
          </Card> */}

          {/* 다시 시작하기 버튼 */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              onClick={() => Navigate("/personal/interview")}
            >
              다시 시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
