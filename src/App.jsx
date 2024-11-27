import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import LoginPage from "@/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubscriptionPage from "@/pages/SubscriptionPage";
import CoachingPage from "@/pages/CoachingPage";
import InterviewPage from "@/pages/InterviewPage";
import PartnershipPage from "@/pages/PartnershipPage";
import FeedbackPage from "@/pages/FeedbackPage";
import B2CLayout from "@/layouts/B2CLayout";
import B2BLayout from "@/layouts/B2BLayout";
import CreateQuestionPage from "@/pages/CreateQuestionPage";
import InterviewRoom from "@/pages/InterviewRoom";
import C2CLayout from "@/layouts/C2CLayout";
import SsePage from "@/SsePage";

// c2c
import InterviewPages from "@/staticpages/InterviewPages";
import InterviewRoomPage from "@/staticpages/InterviewRoomPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<B2CLayout />}>
          <Route path="/user/interview" element={<InterviewPage />} />
          <Route path="/user/coaching" element={<CoachingPage />} />
          <Route path="/user/subscription" element={<SubscriptionPage />} />
          <Route path="/user/partnership" element={<PartnershipPage />} />
          <Route path="/user/feedback" element={<FeedbackPage />} />
        </Route>
        <Route element={<B2BLayout />}>
          <Route path="/company/question" element={<CreateQuestionPage />} />
          <Route path="/company/interview" element={<InterviewPage />} />
          <Route path="/company/coaching" element={<CoachingPage />} />
          <Route path="/company/subscription" element={<SubscriptionPage />} />
          <Route path="/company/partnership" element={<PartnershipPage />} />
          <Route path="/company/feedback" element={<FeedbackPage />} />
        </Route>
        <Route element={<C2CLayout />}>
          <Route path="/personal/interview" element={<InterviewPages />} />
          <Route path="/personal/coaching" element={<CoachingPage />} />
          <Route path="/personal/subscription" element={<SubscriptionPage />} />
          <Route path="/personal/partnership" element={<PartnershipPage />} />
          <Route path="/personal/feedback" element={<FeedbackPage />} />
        </Route>
        <Route
          path="/interview-room/:interviewId"
          element={<InterviewRoom />}
        />
        <Route
          path="/interviewroom/:interviewId"
          element={<InterviewRoomPage />}
        />
        <Route path="/sse/:interviewId" element={<SsePage />} />
      </Routes>
    </Router>
  );
}

export default App;
