// pages/InterviewPage.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import ModalFileUploadForm from "@/modal/ModalFileUploadForm";

const CreateQuestionPage = () => {
  const [portfolio, setPortfolio] = useState("");
  const [jobPosting, setJobPosting] = useState("");
  const [applicationSkill, setApplicationSkill] = useState("FE");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    main_questions_weakpoint_requirements: {
      requirements: [
        {
          question:
            "채용공고에서 redux를 요구하고 있는데, 포트폴리오/이력서에는 해당 내용이 존재하지 않습니다. 혹시 redux를 사용해보신 경험이나 이론적으로 알고 계신 내용이 있나요?",
          tech_keyword: "redux",
          question_type: "경험",
          purpose: "이 사용자가 redux를 사용해 봤는지에 대한 사실 확인",
          example: [
            "우수 : '네, redux를 사용하여 상태 관리를 구현한 경험이 있습니다. 특히 대규모 애플리케이션에서 상태를 효율적으로 관리하는 데 유용했습니다.'",
            "보통 : 'redux에 대해 공부한 적은 있지만, 실제 프로젝트에서 사용해본 적은 없습니다.'",
            "미흡 : 'redux가 무엇인지 잘 모르겠습니다.'",
          ],
          reason:
            "redux 사용 경험을 통해 상태 관리에 대한 이해도를 평가하기 위함입니다.",
        },
        {
          question:
            "채용공고에서 zustand를 요구하고 있는데, 포트폴리오/이력서에는 해당 내용이 존재하지 않습니다. 혹시 zustand를 사용해보신 경험이나 이론적으로 알고 계신 내용이 있나요?",
          tech_keyword: "zustand",
          question_type: "경험",
          purpose: "이 사용자가 zustand를 사용해 봤는지에 대한 사실 확인",
          example: [
            "우수 : 'zustand를 사용하여 경량 상태 관리를 구현한 경험이 있습니다. 특히 간단한 상태 관리가 필요한 프로젝트에서 유용하게 사용했습니다.'",
            "보통 : 'zustand에 대해 들어본 적은 있지만, 실제로 사용해본 적은 없습니다.'",
            "미흡 : 'zustand가 무엇인지 잘 모르겠습니다.'",
          ],
          reason:
            "zustand 사용 경험을 통해 경량 상태 관리 라이브러리에 대한 이해도를 평가하기 위함입니다.",
        },
      ],
    },
    main_questions_weakpoint_preferences: {
      preferences: [
        {
          question:
            "채용공고에서 graphql를 요구하고 있는데, 포트폴리오/이력서에는 해당 내용이 존재하지 않습니다. 혹시 graphql를 사용해보신 경험이나 이론적으로 알고 계신 내용이 있나요?",
          tech_keyword: "graphql",
          question_type: "경험",
          purpose:
            "이 사용자가 해당 기술을 사용해 봤는지에 대한 사실 확인 목적",
          example: [
            "우수 : '네, 이전 프로젝트에서 GraphQL을 사용하여 API를 구축한 경험이 있습니다. 특히 데이터 페칭 최적화에 많은 도움이 되었습니다.'",
            "보통 : 'GraphQL에 대해 공부한 적은 있지만, 실제 프로젝트에서 사용해본 경험은 없습니다.'",
            "미흡 : 'GraphQL이 뭔지 잘 모르겠습니다.'",
          ],
          reason:
            "지원자가 GraphQL에 대한 실무 경험이나 이론적 지식을 가지고 있는지 확인하기 위함입니다.",
        },
      ],
    },
    followed_questions_weakpoint_requirements: {
      requirements: [
        {
          tech_keyword: "redux",
          questions: [
            "Redux를 사용하여 상태 관리를 구현할 때의 주요 이점은 무엇인가요?",
            "Redux의 미들웨어를 활용한 비동기 작업 처리는 어떻게 이루어지나요?",
            "Redux의 액션과 리듀서의 역할과 관계에 대해 설명해 주세요.",
          ],
        },
        {
          tech_keyword: "zustand",
          questions: [
            "Zustand의 상태 관리 방식은 Redux와 어떻게 다른가요?",
            "Zustand를 사용하여 상태를 공유할 때의 장점은 무엇인가요?",
            "Zustand의 상태 업데이트가 성능에 미치는 영향은 무엇인가요?",
          ],
        },
      ],
    },
    followed_questions_weakpoint_preferences: {
      preferences: {
        tech_keyword: null,
        questions: null,
      },
    },
    main_questions_checkpoint_requirements: {
      requirements: [
        {
          question:
            "당신의 포트폴리오에서 Tanstack-Query를 사내에 도입했다고 언급하셨습니다. 이 도입 과정에서 어떤 어려움이 있었고, 이를 어떻게 해결하셨는지 구체적으로 설명해 주실 수 있나요?",
          tech_keyword: "tanstack query",
          question_type: "경험",
          purpose:
            "이 사용자가 Tanstack-Query를 실제로 사용해 봤는지 확인하기 위함입니다.",
          example: [
            "우수 : Tanstack-Query 도입 초기에는 기존 Context API와의 차이점 때문에 팀원들이 혼란스러워 했습니다. 이를 해결하기 위해 내부 세미나를 열어 Tanstack-Query의 장점과 사용법을 공유했습니다. 또한, 도입 후 발생한 버그를 해결하기 위해 공식 문서를 참고하고, 커뮤니티에서 유사한 문제를 찾아 해결했습니다.",
            "보통 : Tanstack-Query를 도입할 때, 기존 코드와의 호환성 문제로 어려움을 겪었습니다. 이를 해결하기 위해 공식 문서를 참고하여 코드를 수정했습니다.",
            "미흡 : Tanstack-Query를 도입했지만, 특별한 어려움은 없었습니다.",
          ],
          reason:
            "포트폴리오에 Tanstack-Query 도입 경험이 언급되어 있으나, 구체적인 경험이나 문제 해결 과정이 명시되어 있지 않아 이를 확인하기 위한 질문입니다.",
        },
        {
          question:
            "포트폴리오에서 Context API의 유저 action이 늘어나면서 상태 관리의 어려움을 느꼈다고 하셨습니다. 이 문제를 해결하기 위해 어떤 접근 방식을 사용하셨는지 설명해 주실 수 있나요?",
          tech_keyword: "context api",
          question_type: "경험",
          purpose:
            "이 사용자가 Context API를 실제로 사용해 봤는지 확인하기 위함입니다.",
          example: [
            "우수 : Context API의 유저 action이 늘어나면서 상태 관리가 복잡해졌습니다. 이를 해결하기 위해 Tanstack-Query를 도입하여 불필요한 상태 관리를 제거하고, 쿼리 업데이트 시점을 직관적으로 표현하여 팀원들이 쉽게 이해할 수 있도록 했습니다.",
            "보통 : Context API의 상태 관리가 복잡해져서 Tanstack-Query로 전환했습니다.",
            "미흡 : Context API를 사용했지만, 특별한 문제는 없었습니다.",
          ],
          reason:
            "포트폴리오에 Context API 사용 경험이 언급되어 있으나, 구체적인 문제 해결 과정이 명시되어 있지 않아 이를 확인하기 위한 질문입니다.",
        },
      ],
    },
    main_questions_checkpoint_preferences: {
      preferences: [
        {
          question:
            "당신의 포트폴리오에서 UI/UX 관련 프로젝트에 대해 언급하셨습니다. 특히, 클라이언트의 추상적인 요구와 느낌을 바탕으로 gsap을 이용해 마이크로 애니메이션을 구현한 경험이 있다고 하셨는데, 이 프로젝트에서 어떤 도전과제를 직면하셨고, 이를 어떻게 해결하셨는지 설명해 주실 수 있나요?",
          tech_keyword: "ui/ux",
          question_type: "경험",
          purpose:
            "이 사용자가 UI/UX 관련 기술을 실제로 사용해 봤는지 확인하기 위함입니다.",
          example: [
            "우수 : 프로젝트에서 클라이언트의 추상적인 요구를 이해하기 위해 여러 차례 미팅을 진행했고, gsap을 활용하여 애니메이션을 구현했습니다. 특히, 클라이언트가 원하는 느낌을 전달하기 위해 다양한 애니메이션 효과를 실험하며 최적의 솔루션을 찾았습니다.",
            "보통 : 클라이언트의 요구를 바탕으로 gsap을 사용하여 애니메이션을 구현했습니다. 몇 가지 어려움이 있었지만, 팀원들과 협력하여 해결했습니다.",
            "미흡 : 클라이언트의 요구에 따라 gsap을 사용했습니다. 특별한 어려움은 없었습니다.",
          ],
          reason:
            "포트폴리오에 UI/UX 관련 경험이 언급되어 있으나, 구체적인 도전과제와 해결 방법에 대한 설명이 부족하여 이를 확인하고자 합니다.",
        },
      ],
    },
    followed_questions_checkpoint_requirements: {
      requirements: [
        {
          tech_keyword: "html",
          questions: [
            "HTML5에서 추가된 시맨틱 태그들에 대해 설명해 주세요.",
            "HTML 문서의 구조를 어떻게 설계하는지 설명해 주세요.",
            "HTML에서 접근성을 고려한 마크업 방법에 대해 설명해 주세요.",
          ],
        },
        {
          tech_keyword: "css",
          questions: [
            "CSS에서 Flexbox와 Grid 레이아웃의 차이점에 대해 설명해 주세요.",
            "CSS의 Box Model이란 무엇이며, 각 구성 요소에 대해 설명해 주세요.",
            "CSS에서 미디어 쿼리를 사용하여 반응형 디자인을 구현하는 방법에 대해 설명해 주세요.",
          ],
        },
        {
          tech_keyword: "javascript",
          questions: [
            "자바스크립트의 비동기 처리 방식에 대해 설명해 주세요.",
            "자바스크립트 클로저(Closure)에 대해 설명해 주세요.",
            "자바스크립트에서 이벤트 위임(Event Delegation)이란 무엇인지 설명해 주세요.",
          ],
        },
        {
          tech_keyword: "typescript",
          questions: [
            "TypeScript에서 인터페이스와 타입의 차이점에 대해 설명해 주세요.",
            "TypeScript의 제네릭(Generic) 타입에 대해 설명해 주세요.",
            "TypeScript에서 유니온 타입과 인터섹션 타입의 차이점에 대해 설명해 주세요.",
          ],
        },
        {
          tech_keyword: "context api",
          questions: [
            "Context API를 사용할 때의 장단점에 대해 설명해 주세요.",
            "Context API와 Redux의 차이점에 대해 설명해 주세요.",
            "Context API를 사용하여 글로벌 상태를 관리하는 방법에 대해 설명해 주세요.",
          ],
        },
        {
          tech_keyword: "tanstack query",
          questions: [
            "TanStack Query를 사용하여 서버 상태를 관리하는 방법에 대해 설명해 주세요.",
            "TanStack Query의 캐싱 메커니즘에 대해 설명해 주세요.",
            "TanStack Query와 Redux를 비교하여 설명해 주세요.",
          ],
        },
      ],
    },
    followed_questions_checkpoint_preferences: {
      preferences: [
        {
          tech_keyword: "ui/ux",
          questions: [
            "사용자의 불편함을 분석하고 개선한 경험이 있으시다면, 그 사례를 공유해 주실 수 있을까요?",
            "유저가 더 편리할 것이라고 설득할 때, 추가 기능 개발에 대한 근거로 무엇을 사용하나요?",
            "프로젝트에서 UX 최적화와 관련된 경험이 있으신가요? 있다면, 어떤 부분에서 UX 최적화를 위해 작업했는지 설명해 주세요.",
          ],
        },
        {
          tech_keyword: "UI 컴포넌트 단위 테스트 진행",
          questions: [
            "UI 컴포넌트의 단위 테스트를 진행할 때 주로 사용하는 도구는 무엇인가요?",
            "단위 테스트를 통해 발견할 수 있는 UI 컴포넌트의 문제점은 무엇인가요?",
            "UI 컴포넌트 단위 테스트를 작성할 때 고려해야 할 주요 요소는 무엇인가요?",
          ],
        },
        {
          tech_keyword: "반응형 UI 구현",
          questions: [
            "반응형 UI를 구현할 때 가장 큰 도전 과제는 무엇이었나요?",
            "반응형 디자인을 구현하기 위해 어떤 CSS 기술을 주로 사용하시나요?",
            "다양한 디바이스에서 일관된 사용자 경험을 제공하기 위해 어떤 전략을 사용하시나요?",
          ],
        },
      ],
    },
    questions_wowpoint: {
      questions_wowpoint_tech: [
        "Tanstack-Query를 사내에 도입하여 상태 관리의 어려움을 해결한 경험이 있다고 하셨습니다. Tanstack-Query의 내부 동작 원리와 이를 통해 상태 관리의 어떤 부분을 어떻게 개선하셨는지 구체적으로 설명해 주실 수 있나요?",
        "TypeScript를 활용하여 React-Hook-form의 control 메서드를 사용해 상태 관리를 최적화한 경험이 있다고 하셨습니다. control 메서드의 작동 방식과 이를 통해 코드의 효율성을 어떻게 높였는지 설명해 주실 수 있나요?",
        "Storybook을 사용하여 UI 컴포넌트 단위 테스트를 진행하고 클라이언트와 소통한 경험이 있다고 하셨습니다. Storybook을 활용한 UI/UX 개선 과정에서 가장 큰 도전 과제는 무엇이었으며, 이를 어떻게 해결하셨는지 설명해 주실 수 있나요?",
      ],
      questions_wowpoint_experience: [
        "3개의 사내 프로덕트를 메인으로 맡아, 섬세한 비즈니스 로직을 구현하기 위해 스스로 QA 항목을 만들어 팀원들과 공유하며 데이터를 구축해왔습니다. 해당 경험에서 겪은 문제들 중 가장 힘들었던 것과, 그 문제를 해결한 경험에 대해 소개해주세요.",
        "서비스가 시장에서 어떤 반응을 얻고 있는지 빠르게 파악하고 적용하고자 합니다. 해당 경험에서 겪은 문제들 중 가장 힘들었던 것과, 그 문제를 해결한 경험에 대해 소개해주세요.",
        "기술이 필요할 때는 문서와 데모를 제작하여 문제를 해결하는 방식으로 접근하고 있습니다. 해당 경험에서 겪은 문제들 중 가장 힘들었던 것과, 그 문제를 해결한 경험에 대해 소개해주세요.",
      ],
    },
    questions_doubtpoint: {
      questions_doubtpoint: [
        "스포츠마케팅학과를 전공하셨는데, 졸업 후 빠르게 개발 관련 직군으로 전환하신 이유가 궁금합니다. 스포츠마케팅과 개발 사이에 어떤 연결고리가 있었나요?",
        "밸류와이즈 개발팀에서 프리랜서로 1개월 동안 일하셨다고 하셨는데, 이 짧은 기간 동안 어떤 구체적인 역할을 수행하셨는지 설명해 주실 수 있나요?",
        "knccapitalManagement 개발팀에서 프리랜서로 일하셨다고 하셨는데, 경력 기간이 명시되어 있지 않습니다. 이 프로젝트에서의 구체적인 역할과 기간을 설명해 주실 수 있나요?",
      ],
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = (uploadedPortfolio) => {
    setPortfolio(uploadedPortfolio);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/v7/create_question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            portfolio_data: portfolio,
            job_description_data: jobPosting,
            input_position: applicationSkill,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("파일 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[98px] max-w-3xl w-full">
      <Card className=" mx-auto p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="portfolio"
              className="block text-sm font-medium text-gray-700"
            >
              포트폴리오
            </label>
            <textarea
              id="portfolio"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              rows={15}
              className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="포트폴리오를 입력하세요..."
            />
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              포트폴리오 첨부
            </button>
          </div>

          <div>
            <label
              htmlFor="jobPosting"
              className="block text-sm font-medium text-gray-700"
            >
              채용공고
            </label>
            <textarea
              id="jobPosting"
              value={jobPosting}
              onChange={(e) => setJobPosting(e.target.value)}
              rows={15}
              className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="채용공고를 입력하세요..."
            />
          </div>

          <div>
            <label
              htmlFor="applicationSkill"
              className="block text-sm font-medium text-gray-700"
            >
              지원역량
            </label>
            <select
              id="applicationSkill"
              value={applicationSkill}
              onChange={(e) => setApplicationSkill(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-1.5 px-2"
            >
              <option value="FE">FE</option>
              <option value="BE">BE</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !portfolio.trim() || !jobPosting.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  처리 중...
                </>
              ) : (
                "제출"
              )}
            </button>
          </div>
        </form>

        {/* {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md relative">
          <h3 className="text-lg font-medium text-gray-900">결과:</h3>
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                Object.entries(result.output_data)
                  .map(([key, values]) => `- ${key}\n${values.join("\n")}`)
                  .join("\n\n")
              )
            }
            className="absolute top-2 right-2 p-2 text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            title="복사"
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>
      )} */}
        {result && (
          <div>
            <pre>{JSON.stringify(result, null, 2)}</pre>
            <Card>
              <CardContent>
                <h3>main_questions_weakpoint_requirements</h3>
                result.main_questions_weakpoint_requirements.requirements
                {/* {result.main_questions_weakpoint_requirements} */}
              </CardContent>
            </Card>
          </div>
          // <div className="mt-2 text-sm text-gray-700">
          //   <h3 className="text-lg font-medium text-gray-900">
          //     Wow Point 질문
          //   </h3>
          //   <div className="mt-6 p-4 bg-gray-100 rounded-md relative mb-4">
          //     <h3 className="text-md font-medium text-gray-900">
          //       기술기반 Wow point
          //     </h3>
          //     {result.questions_wowpoint.questions_wowpoint_tech.map(
          //       (question, index) => (
          //         <div key={index} className="mb-2">
          //           {question}
          //         </div>
          //       )
          //     )}
          //   </div>
          //   <div className="mt-6 p-4 bg-gray-100 rounded-md relative mb-4">
          //     <h3 className="text-sm font-medium text-gray-900">
          //       경험기반 Wow point
          //     </h3>
          //     {result.questions_wowpoint.questions_wowpoint_experience.map(
          //       (question, index) => (
          //         <div key={index} className="mb-2">
          //           {question}
          //         </div>
          //       )
          //     )}
          //   </div>
          //   <h3 className="text-lg font-medium text-gray-900">
          //     의심스러운 정황 질문
          //   </h3>
          //   <div className="mt-6 p-4 bg-gray-100 rounded-md relative mb-4">
          //     <h3 className="text-sm font-medium text-gray-900">
          //       포트폴리오에서의 의심스러운 정황
          //     </h3>
          //     {result.questions_doubtpoint.doubt_questions_pf_only.map(
          //       (question, index) => (
          //         <div key={index} className="mb-2">
          //           {question}
          //         </div>
          //       )
          //     )}
          //   </div>
          //   <div className="mt-6 p-4 bg-gray-100 rounded-md relative mb-4">
          //     <h3 className="text-sm font-medium text-gray-900">
          //       포트폴리오와 채용공고 모두에서의 의심스러운 정황
          //     </h3>
          //     {result.questions_doubtpoint.doubt_questions_jd_and_pf.map(
          //       (question, index) => (
          //         <div key={index} className="mb-2">
          //           {question}
          //         </div>
          //       )
          //     )}
          //   </div>
          //   <h3 className="text-lg font-medium text-gray-900">
          //     채용공고 - pf의 부합성, [채용공고, 포트폴리오] 교집합 질문:
          //   </h3>
          //   <h3 className="text-lg font-medium text-gray-900">자격요건</h3>
          //   <div className="mt-6 p-4 bg-gray-100 rounded-md relative mb-4">
          //     {Object.entries(
          //       result.questions_requirements_in_pf_semantic_search
          //     ).map(([key, value]) => (
          //       <div key={key} className="mb-2">
          //         <div className="font-semibold">{key}</div>
          //         <ul className="list-disc pl-5">
          //           {value.experience_based_questions.map((question, index) => (
          //             <li key={index} className="mb-1">
          //               {question}
          //             </li>
          //           ))}
          //         </ul>
          //         <ul className="list-disc pl-5">
          //           {value.tech_based_questions.map((question, index) => (
          //             <li key={index} className="mb-1">
          //               {question}
          //             </li>
          //           ))}
          //         </ul>
          //       </div>
          //     ))}
          //   </div>
          //   <h3 className="text-lg font-medium text-gray-900">우대사항</h3>
          //   <div className="mt-6 p-4 bg-gray-100 rounded-md relative mb-4">
          //     {Object.entries(
          //       result.questions_preferences_in_pf_semantic_search
          //     ).map(([key, value]) => (
          //       <div key={key} className="mb-2">
          //         <div className="font-bold">{key}</div>
          //         <ul className="list-disc pl-5">
          //           {value.experience_based_questions.map((question, index) => (
          //             <li key={index} className="mb-1">
          //               {question}
          //             </li>
          //           ))}
          //         </ul>
          //         <ul className="list-disc pl-5">
          //           {value.tech_based_questions.map((question, index) => (
          //             <li key={index} className="mb-1">
          //               {question}
          //             </li>
          //           ))}
          //         </ul>
          //       </div>
          //     ))}
          //   </div>
          //   <h3 className="text-lg font-medium text-gray-900">
          //     채용공고 - pf의 부합성, [채용공고, 포트폴리오] 차집합 질문:
          //   </h3>
          //   <h3 className="text-lg font-medium text-gray-900">자격요건</h3>
          //   <div className="mt-6 p-4 bg-gray-100 rounded-md relative mb-4">
          //     {Object.entries(
          //       result.questions_requirements_not_in_pf_semantic_search
          //     ).map(([key, value]) => (
          //       <div key={key} className="mb-2">
          //         <div className="font-bold">{key}</div>
          //         <ul className="list-disc pl-5">
          //           {value.map((item, index) => (
          //             <li key={index} className="mb-1">
          //               {item}
          //             </li>
          //           ))}
          //         </ul>
          //       </div>
          //     ))}
          //   </div>
          //   <h3 className="text-lg font-medium text-gray-900">우대사항</h3>
          //   <div className="mt-6 p-4 bg-gray-100 rounded-md relative mb-4">
          //     {Object.entries(
          //       result.questions_preferences_not_in_pf_semantic_search
          //     ).map(([key, value]) => (
          //       <div key={key} className="mb-2">
          //         <div className="font-bold">{key}</div>
          //         <ul className="list-disc pl-5">
          //           {value.map((item, index) => (
          //             <li key={index} className="mb-1">
          //               {item}
          //             </li>
          //           ))}
          //         </ul>
          //       </div>
          //     ))}
          //   </div>
          // </div>
        )}

        {/* 모달 파일 업로드 폼 */}
        <ModalFileUploadForm
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onFileUpload={handleFileUpload}
        />
      </Card>
    </div>
  );
};

export default CreateQuestionPage;
