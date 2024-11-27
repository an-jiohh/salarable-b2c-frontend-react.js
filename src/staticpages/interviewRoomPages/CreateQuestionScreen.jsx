import React, { useState } from "react";
import { useContext } from "react";
import SetupContext from "@/staticpages/interviewRoomPages/SetupProvider";
import { Card, CardContent } from "@/components/ui/card";
import ModalFileUploadForm from "@/modal/ModalFileUploadForm";
import { Loader2 } from "lucide-react";

const CreateQuestionScreen = ({ onNext }) => {
  const { audioRef, videoRef, wsRef, questionRef, interviewId } =
    useContext(SetupContext);
  const [portfolio, setPortfolio] = useState("");
  const [jobPosting, setJobPosting] = useState("");
  const [applicationSkill, setApplicationSkill] = useState("FE");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (uploadedPortfolio, fileName) => {
    setFileName(fileName);
    setPortfolio(uploadedPortfolio);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create_question/${interviewId}`,
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
        questionRef.current = data;
      } else {
        alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("파일 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
    onNext();
  };

  return (
    <div className="pt-[98px] p-8 max-w-3xl w-full">
      <Card className=" mx-auto p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="portfolio"
              className="block text-sm font-medium text-gray-700"
            >
              포트폴리오
            </label>
            {/* <textarea
              id="portfolio"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              rows={15}
              className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="포트폴리오를 입력하세요..."
            /> */}
            <label className="block text-sm font-medium text-gray-700">
              {fileName}
            </label>
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
              className="mt-1 block w-full h-72 rounded-md border border-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
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

export default CreateQuestionScreen;
