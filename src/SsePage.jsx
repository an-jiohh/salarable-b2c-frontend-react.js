import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

const SsePage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/sse`);

    eventSource.onmessage = (event) => {
      try {
        // JSON 데이터 파싱
        const parsedData = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, parsedData]);
      } catch (error) {
        console.error("Error parsing SSE data", error);
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection error");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  console.log(messages);

  const [pf_original, setPf_original] = useState("");
  const [jd_original, setJd_original] = useState("");
  const [conformitypoint, setConformitypoint] = useState("");
  const [wowpoint, setWowpoint] = useState("");
  const [doubtpoint_pf_only, setDoubtpoint_pf_only] = useState("");
  const [weak_requirements_keywords, setWeak_requirements_keywords] =
    useState("");
  const [weak_preferences_keywords, setWeak_preferences_keywords] =
    useState("");
  const [check_requirements_keywords, setCheck_requirements_keywords] =
    useState("");
  const [check_preferences_keywords, setCheck_preferences_keywords] =
    useState("");
  const [
    requirements_in_pf_semantic_search,
    setRequirements_in_pf_semantic_search,
  ] = useState("");
  const [
    requirements_not_in_pf_semantic_search,
    setRequirements_not_in_pf_semantic_search,
  ] = useState("");
  const [
    preferences_in_pf_semantic_search,
    setPreferences_in_pf_semantic_search,
  ] = useState("");
  const [
    preferences_not_in_pf_semantic_search,
    setPreferences_not_in_pf_semantic_search,
  ] = useState("");
  const [evaluationQuesiton, setEvaluationQuesiton] = useState([]);

  // 대질문 생성
  const [
    main_questions_weakpoint_requirements,
    setMain_questions_weakpoint_requirements,
  ] = useState("");
  const [
    main_questions_weakpoint_preferences,
    setMain_questions_weakpoint_preferences,
  ] = useState("");
  const [
    followed_questions_weakpoint_requirements,
    setFollowed_questions_weakpoint_requirements,
  ] = useState("");
  const [
    followed_questions_weakpoint_preferences,
    setFollowed_questions_weakpoint_preferences,
  ] = useState("");
  const [
    main_questions_checkpoint_requirements,
    setMain_questions_checkpoint_requirements,
  ] = useState("");
  const [
    main_questions_checkpoint_preferences,
    setMain_questions_checkpoint_preferences,
  ] = useState("");
  const [
    followed_questions_checkpoint_requirements,
    setFollowed_questions_checkpoint_requirements,
  ] = useState("");
  const [
    followed_questions_checkpoint_preferences,
    setFollowed_questions_checkpoint_preferences,
  ] = useState("");
  const [questions_wowpoint, setQuestions_wowpoint] = useState("");
  const [questions_doubtpoint, setQuestions_doubtpoint] = useState("");

  useEffect(() => {
    setEvaluationQuesiton([]);
    messages.forEach((msg) => {
      if (msg.type === "pf_original") {
        setPf_original(msg.data);
      } else if (msg.type === "jd_original") {
        setJd_original(msg.data);
      } else if (msg.type === "conformitypoint") {
        setConformitypoint(msg.data);
      } else if (msg.type === "wowpoint") {
        setWowpoint(msg.data);
      } else if (msg.type === "doubtpoint_pf_only") {
        setDoubtpoint_pf_only(msg.data);
      } else if (msg.type === "weak_requirements_keywords") {
        setWeak_requirements_keywords(msg.data);
      } else if (msg.type === "weak_preferences_keywords") {
        setWeak_preferences_keywords(msg.data);
      } else if (msg.type === "check_requirements_keywords") {
        setCheck_requirements_keywords(msg.data);
      } else if (msg.type === "check_preferences_keywords") {
        setCheck_preferences_keywords(msg.data);
      } else if (msg.type === "requirements_in_pf_semantic_search") {
        setRequirements_in_pf_semantic_search(msg.data);
      } else if (msg.type === "requirements_not_in_pf_semantic_search") {
        setRequirements_not_in_pf_semantic_search(msg.data);
      } else if (msg.type === "preferences_in_pf_semantic_search") {
        setPreferences_in_pf_semantic_search(msg.data);
      } else if (msg.type === "preferences_not_in_pf_semantic_search") {
        setPreferences_not_in_pf_semantic_search(msg.data);
      } else if (msg.type === "main_questions_weakpoint_requirements") {
        setMain_questions_weakpoint_requirements(msg.data);
      } else if (msg.type === "main_questions_weakpoint_preferences") {
        setMain_questions_weakpoint_preferences(msg.data);
      } else if (msg.type === "followed_questions_weakpoint_requirements") {
        setFollowed_questions_weakpoint_requirements(msg.data);
      } else if (msg.type === "followed_questions_weakpoint_preferences") {
        setFollowed_questions_weakpoint_preferences(msg.data);
      } else if (msg.type === "main_questions_checkpoint_requirements") {
        setMain_questions_checkpoint_requirements(msg.data);
      } else if (msg.type === "main_questions_checkpoint_preferences") {
        setMain_questions_checkpoint_preferences(msg.data);
      } else if (msg.type === "followed_questions_checkpoint_requirements") {
        setFollowed_questions_checkpoint_requirements(msg.data);
      } else if (msg.type === "followed_questions_checkpoint_preferences") {
        setFollowed_questions_checkpoint_preferences(msg.data);
      } else if (msg.type === "questions_wowpoint") {
        setQuestions_wowpoint(msg.data);
      } else if (msg.type === "questions_doubtpoint") {
        setQuestions_doubtpoint(msg.data);
      } else if (msg.type === "expanded_questions") {
        setEvaluationQuesiton((prev) => [...prev, msg.data]);
      } else if (msg.type === "ranked_questions") {
        setEvaluationQuesiton((prev) => [...prev, msg.data]);
      } else if (msg.type === "augumented_datas") {
        setEvaluationQuesiton((prev) => [...prev, msg.data]);
      } else if (msg.type === "score") {
        setEvaluationQuesiton((prev) => [...prev, msg.data]);
      } else if (msg.type === "reason") {
        setEvaluationQuesiton((prev) => [...prev, msg.data]);
      } else if (msg.type === "searched_question") {
        setEvaluationQuesiton((prev) => [...prev, msg.data]);
      }
    });
  }, [messages]);

  return (
    <div className="">
      <h1 className="p-8 pb-0">대질문 생성</h1>
      {/* {messages.map((msg, index) => (
        <React.Fragment key={index}>
          {index % 3 === 0 && index !== 0 && (
            <hr style={{ width: "100%", margin: "20px 0" }} />
          )}
          <Card style={{ margin: "10px", width: "300px" }}>
            <CardContent>
              <strong>{msg.type}:</strong> {JSON.stringify(msg.data)}
            </CardContent>
          </Card>
        </React.Fragment>
      ))} */}
      <div className=" w-full p-8">
        <Card className="h-64 mb-2">
          <CardHeader className="p-4 pb-0">전처리된 포트폴리오</CardHeader>
          <CardContent
            style={{ whiteSpace: "pre-line" }}
            className="overflow-auto h-3/4 p-4"
          >
            {pf_original}
          </CardContent>
        </Card>
        <Card className=" h-64 mb-2">
          <CardHeader className="p-4 pb-0">전처리된 채용공고</CardHeader>
          <CardContent
            style={{ whiteSpace: "pre-line" }}
            className="overflow-auto h-3/4 p-4"
          >
            {jd_original}
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center">
        <ArrowDown className="w-6 h-6" />
      </div>
      <div className="w-full p-8">
        <Card className=" h-64 mb-2">
          <CardHeader className="p-4 pb-0">
            week point 및 check point
          </CardHeader>
          <CardContent
            style={{ whiteSpace: "pre-line" }}
            className="overflow-auto h-3/4 p-4"
          >
            {conformitypoint}
          </CardContent>
        </Card>
        <Card className=" h-64 mb-2">
          <CardHeader className="p-4 pb-0">강점</CardHeader>
          <CardContent
            style={{ whiteSpace: "pre-line" }}
            className="overflow-auto h-3/4 p-4"
          >
            {wowpoint}
          </CardContent>
        </Card>
        <Card style={{ whiteSpace: "pre-line" }} className=" h-64 mb-2">
          <CardHeader className="p-4 pb-0">의심스러운정황</CardHeader>
          <CardContent className="overflow-auto h-3/4 p-4">
            {doubtpoint_pf_only}
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center">
        <ArrowDown className="w-6 h-6" />
      </div>
      {/* <div className="flex justify-around w-full p-8">
        <Card className="w-1/6 h-64">
          <CardHeader className="p-4 pb-0">
            weak_requirements_keywords
          </CardHeader>
          <CardContent className="overflow-auto h-3/4 p-4">
            {weak_requirements_keywords}
          </CardContent>
        </Card>
        <Card className="w-1/6 h-64">
          <CardHeader className="p-4 pb-0">
            weak_preferences_keywords
          </CardHeader>
          <CardContent className="overflow-auto h-3/4 p-4">
            {weak_preferences_keywords}
          </CardContent>
        </Card>
        <Card className="w-1/6 h-64">
          <CardHeader className="p-4 pb-0">
            check_requirements_keywords
          </CardHeader>
          <CardContent className="overflow-auto h-3/4 p-4">
            {check_requirements_keywords}
          </CardContent>
        </Card>
        <Card className="w-1/6 h-64">
          <CardHeader className="p-4 pb-0">
            check_preferences_keywords
          </CardHeader>
          <CardContent className="overflow-auto h-3/4 p-4">
            {check_preferences_keywords}
          </CardContent>
        </Card>
      </div> */}
      <div className="w-full p-8">
        <Card className="h-64 mb-2">
          <CardHeader className="p-4 pb-0">
            자격요건 바탕 weak point 질문
          </CardHeader>
          <CardContent
            style={{ whiteSpace: "pre-line" }}
            className="overflow-auto h-3/4 p-4"
          >
            {main_questions_weakpoint_requirements}
          </CardContent>
        </Card>
        <Card className=" h-64 mb-2">
          <CardHeader className="p-4 pb-0">
            우대사항 바탕 weak point 질문
          </CardHeader>
          <CardContent
            style={{ whiteSpace: "pre-line" }}
            className="overflow-auto h-3/4 p-4"
          >
            {main_questions_weakpoint_preferences}
          </CardContent>
        </Card>
        <Card className=" h-64 mb-2">
          <CardHeader className="p-4 pb-0">
            자격요건 바탕 check point 질문
          </CardHeader>
          <CardContent
            style={{ whiteSpace: "pre-line" }}
            className="overflow-auto h-3/4 p-4"
          >
            {main_questions_checkpoint_requirements}
          </CardContent>
        </Card>
        <Card className=" h-64 mb-2">
          <CardHeader className="p-4 pb-0">
            우대사항 바탕 check point 질문
          </CardHeader>
          <CardContent
            style={{ whiteSpace: "pre-line" }}
            className="overflow-auto h-3/4 p-4"
          >
            {main_questions_checkpoint_preferences}
          </CardContent>
        </Card>
        <Card className=" h-64 mb-2">
          <CardHeader className="p-4 pb-0">의심스러운 정황 질문</CardHeader>
          <CardContent
            style={{ whiteSpace: "pre-line" }}
            className="overflow-auto h-3/4 p-4"
          >
            {questions_doubtpoint}
          </CardContent>
        </Card>
        <Card className=" h-64 mb-2">
          <CardHeader className="p-4 pb-0">강점 질문</CardHeader>
          <CardContent
            style={{ whiteSpace: "pre-line" }}
            className="overflow-auto h-3/4 p-4"
          >
            {questions_wowpoint}
          </CardContent>
        </Card>
      </div>

      <h1 className="p-8 pb-0">꼬리질문 평가 및 생성</h1>
      <div className="w-full p-8">
        <Card className="w-full p-4 mb-2">
          {evaluationQuesiton.map((evaluation, index) => (
            <CardContent
              key={index}
              style={{ whiteSpace: "pre-line" }}
              className="overflow-auto max-h-64 "
            >
              {evaluation}
            </CardContent>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default SsePage;
