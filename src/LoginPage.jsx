import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");

  const handleUserLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    navigate("/user/interview"); // 일반 회원용 경로
  };

  const handleCompanyLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    navigate("/company/interview"); // 기업용 경로
  };

  const handlePersonalLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    navigate("/user/interview"); // 기업용 경로
  };

  const LoginForm = ({ onLogin, userType }) => (
    <div className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder={`${
            userType === "company" ? "기업" : "개인"
          } 이메일을 입력해주세요.`}
          className="w-full"
          ref={emailRef}
        />
      </div>
      <div className="relative">
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          className="w-full pr-10"
          ref={passwordRef}
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <EyeIcon className="w-5 h-5" />
        </button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button className="w-full" size="lg" onClick={onLogin}>
        로그인
      </Button>
      <Button variant="outline" className="w-full" size="lg">
        회원가입
      </Button>

      <div className="flex justify-center space-x-4 text-sm text-gray-500 mt-4">
        <button>이메일 찾기</button>
        <span>|</span>
        <button>비밀번호 찾기</button>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Salarable</div>
          <div className="space-x-4">
            <Button variant="ghost">Salarable 소개</Button>
            <Button variant="ghost">이용후기</Button>
            <Button variant="ghost">가격안내</Button>
            <Button variant="ghost">대학/기관</Button>
            <Button variant="outline">로그인</Button>
            <Button variant="default">회원가입</Button>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="user">회원 로그인</TabsTrigger>
                <TabsTrigger value="company">기업 로그인</TabsTrigger>
              </TabsList>

              <TabsContent value="user">
                <LoginForm onLogin={handleUserLogin} userType="user" />
              </TabsContent>

              <TabsContent value="company">
                <LoginForm onLogin={handlePersonalLogin} userType="company" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
