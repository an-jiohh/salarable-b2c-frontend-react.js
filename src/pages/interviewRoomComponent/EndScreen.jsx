import React, { useState, useEffect, useContext } from "react";
import SetupContext from "@/pages/interviewRoomComponent/SetupProvider";
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
  } = useContext(SetupContext);

  const chartData = [{ month: "january", mobile: score, desktop: 100 - score }];
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
  console.log(score);

  const chartData2 = [
    { month: "Java", desktop: 3 },
    { month: "DB", desktop: 2 },
    { month: "architecture", desktop: 1 },
    { month: "redis", desktop: 1 },
    { month: "Spring", desktop: 4 },
    { month: "ci/cd", desktop: 3 },
  ];

  const chartConfig2 = {
    desktop: {
      label: "Desktop",
      color: "#4C80F1",
    },
  };

  const barChartData = [
    { month: "불안도", desktop: 36 },
    { month: "신뢰도", desktop: 74 },
  ];

  const barChartConfig = {
    desktop: {
      label: "Desktop",
      color: "#4C80F1",
    },
  };

  const mockResult = {
    user: "User",
    sections: [
      {
        title: "답변 요약",
        content:
          "User님의 면접 합격 가능성은 23%입니다. \n 면접 영상 분석 결과, User님의 면접 준비 상태는 '부족'입니다. \n 역량 상승이 절대적으로 필요합니다. \n 답변 분석을 참고하여 본인의 면접 습관을 찾아 개선해보세요. 본인의 면접 습관을 차근차근 고친다면 면접 합격 가능성을 높일 수 있습니다.",
      },
      {
        title: "발견된 경험",
        subsections: [
          {
            number: "1",
            score: 3,
            title:
              "TypeScript를 사용하여 프로젝트를 진행한 경험이 있으신가요? 예를 들어, 어떤 프로젝트에서 TypeScript를 활용하셨는지 설명해 주실 수 있나요?",
            content:
              "SW마에스트로 활동에서 typescript를 앱 개발 시 사용해봤습니다",
            reason:
              "사용자는 TypeScript를 사용한 경험을 언급했지만, 구체적인 프로젝트 설명이나 TypeScript의 장점, 사용한 기능에 대한 설명이 부족합니다. 예를 들어, TypeScript의 정적 타입 검사 기능을 활용하여 코드의 안정성과 유지보수성을 높였다는 점이나, 인터페이스와 제네릭을 사용하여 재사용 가능한 컴포넌트를 설계했다는 구체적인 예시가 필요합니다.",
            keyword: ["TypeScript"],
          },
          {
            number: "2",
            title:
              "TypeScript를 사용하여 프로젝트를 진행하면서, 정적 타입 검사를 통해 발견한 버그나 문제를 해결한 경험이 있으신가요? 구체적인 사례를 들어 설명해 주세요.",
            score: 3,
            content: "정적 타입검사를 하기 위해 tdd를 사용해보았습니다",
            reason:
              "사용자 답변은 TypeScript의 정적 타입 검사와 관련된 구체적인 경험을 설명하지 않고, 대신 TDD를 언급하고 있습니다. 이는 질문의 주제에서 벗어난 답변으로, TypeScript의 정적 타입 검사로 발견한 버그나 문제 해결 경험을 구체적으로 설명하지 않았습니다.",
            keyword: [""],
          },
          {
            number: "3",
            title:
              "TypeScript를 사용하여 프로젝트를 진행하면서, 가장 구성하기 까다로웠던 타입은 무엇이었으며, 이를 어떻게 해결하셨나요? 구체적인 사례를 들어 설명해 주세요.",
            score: 0,
            content: "기억이 나지 않습니다.",
            reason:
              "사용자는 TypeScript를 사용한 경험에 대해 구체적으로 설명하지 않고, 질문에 대한 답변을 회피하였습니다. 이는 지원자의 경험에 대한 자신감이 부족하거나, 프로젝트 경험을 충분히 경험하지 못했을 수 있습니다.",
            keyword: [""],
          },
        ],
      },
    ],
  };

  return (
    <div className="pt-[72px] flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto p-8">
        <div className="space-y-6">
          {/* 이메일 결과 섹션 */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-medium">
              {mockResult.user}님의 모의면접 결과입니다.
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
                    {mockResult.sections[0].content}
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
                  <PolarAngleAxis dataKey="month" />
                  <PolarRadiusAxis
                    domain={[0, 5]}
                    axisLine={false}
                    tick={false}
                    tickLine={true}
                    // ticks={[]}
                  />
                  <PolarGrid gridCount={5} />
                  <Radar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
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
                {mockResult.sections[1].subsections.map((section, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">
                        {section.number}
                      </span>
                      <h4 className="font-medium">{section.title}</h4>
                    </div>
                    <p className="text-gray-600">점수 : {section.score}</p>
                    <p className="text-gray-600">답변 : {section.content}</p>
                    <p className="text-gray-600">이유 : {section.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 답변 요약 카드 */}
          <Card className="bg-white">
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
          </Card>

          {/* 보완점 섹션 */}
          <Card className="bg-white">
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
          </Card>

          {/* 종합 의견 섹션 */}
          <Card className="bg-white">
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
          </Card>

          {/* 다시 시작하기 버튼 */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
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
