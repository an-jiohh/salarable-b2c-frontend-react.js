import React, { useState, useRef } from "react";
import {
  Loader2,
  Upload,
  Trash2,
  PlusCircle,
  EyeOff,
  X,
  RefreshCw,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import Modal from "react-modal";
import "@/styles/modal.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const ModalFileUploadForm = ({ isOpen, onRequestClose, onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [maskingTexts, setMaskingTexts] = useState([""]);
  const [replacementTexts, setReplacementTexts] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  //파일 선택
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("PDF 파일만 업로드 가능합니다.");
      event.target.value = null; // 파일 선택 초기화
      return;
    }

    setFile(selectedFile);
    if (selectedFile) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append(`masking_text`, "");
      formData.append(`replacement_text`, "");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/portfolio/mask`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
          setPdfUrl(url);
        } else {
          alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  //마스킹 시
  const handleMasking = async (event) => {
    event.preventDefault();
    // 유효한 마스킹 텍스트와 대체 텍스트가 있는지 확인
    const validMaskingTexts = maskingTexts.filter((text) => text.trim() !== "");
    const validReplacementTexts = replacementTexts.filter(
      (text) => text.trim() !== ""
    );
    if (
      validMaskingTexts.length === 0 ||
      validReplacementTexts.length === 0 ||
      validMaskingTexts.length !== validReplacementTexts.length
    ) {
      alert("마스킹할 텍스트와 대체할 텍스트를 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(`masking_text`, "");
    formData.append(`replacement_text`, "");
    maskingTexts.forEach((text, index) => {
      if (text.trim() !== "") {
        formData.append(`masking_text`, text);
      }
    });
    replacementTexts.forEach((text, index) => {
      if (text.trim() !== "") {
        formData.append(`replacement_text`, text);
      }
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/portfolio/mask`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        setPdfUrl(url);
      } else {
        alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  //제출 시
  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    try {
      if (!file) {
        throw new Error("파일이 선택되지 않았습니다.");
      }

      // JSON 객체 생성
      const jsonData = { file_name: file.name };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/portfolio/maskedText`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        }
      );

      if (response.ok && response.status === 200) {
        const result = await response.json();
        // 결과 처리
        onFileUpload(result.masked_text, file.name); // 서버 응답에 masked_text가 포함되어 있다고 가정
        handleReset();
        onRequestClose();
      } else {
        alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("제출 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleReset = () => {
    setFile(null);
    setPdfUrl(null);
    setMaskingTexts([""]);
    setReplacementTexts([""]);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleMaskingTextChange = (index, value) => {
    const newMaskingTexts = [...maskingTexts];
    newMaskingTexts[index] = value;
    setMaskingTexts(newMaskingTexts);
  };

  const handleReplacementTextChange = (index, value) => {
    const newReplacementTexts = [...replacementTexts];
    newReplacementTexts[index] = value;
    setReplacementTexts(newReplacementTexts);
  };

  const addTextFields = () => {
    setMaskingTexts([...maskingTexts, ""]);
    setReplacementTexts([...replacementTexts, ""]);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="relative flex h-full">
        <button
          onClick={() => {
            handleReset();
            onRequestClose();
          }}
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
          aria-label="닫기"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md overflow-y-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              포트폴리오 업로드
            </h1>
            <button
              onClick={handleReset}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="초기화"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleMasking} className="space-y-6">
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                파일 업로드:
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  파일 선택
                </button>
                <span className="ml-3 text-sm text-gray-500">
                  {file ? file.name : "선택된 파일 없음"}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="w-5/12">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    마스킹할 텍스트
                  </label>
                </div>
                <div className="w-5/12">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    대체할 텍스트
                  </label>
                </div>
                <div className="w-2/12">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    삭제
                  </label>
                </div>
              </div>
              {maskingTexts.map((text, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-grow flex space-x-2">
                    <div className="w-1/2">
                      <input
                        type="text"
                        id={`maskingText-${index}`}
                        value={text}
                        onChange={(e) =>
                          handleMaskingTextChange(index, e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                      />
                    </div>
                    <div className="w-1/2">
                      <select
                        id={`replacementText-${index}`}
                        value={replacementTexts[index]}
                        onChange={(e) =>
                          handleReplacementTextChange(index, e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 bg-white align-middle"
                        style={{ height: "2.6rem" }}
                      >
                        <option value="" disabled hidden>
                          선택하세요
                        </option>
                        <option value="name">name</option>
                        <option value="univ">univ</option>
                        <option value="etc">etc</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newMaskingTexts = maskingTexts.filter(
                        (_, i) => i !== index
                      );
                      const newReplacementTexts = replacementTexts.filter(
                        (_, i) => i !== index
                      );
                      setMaskingTexts(newMaskingTexts);
                      setReplacementTexts(newReplacementTexts);
                    }}
                    className="ml-2 px-2 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addTextFields}
                className="mt-1 px-2 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || isUploading || !file}
                onClick={handleMasking}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    마스킹 중...
                  </>
                ) : isUploading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    업로드 중...
                  </>
                ) : (
                  <>
                    <EyeOff className="mr-2 h-5 w-5" />
                    마스킹
                  </>
                )}
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !file}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    제출 중...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    제출
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            제출한 포트폴리오.pdf
          </h2>
          {pdfUrl ? (
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={1.0}
                  width={600}
                />
              ))}
            </Document>
          ) : (
            <p>
              {loading ? (
                <Loader2 className="animate-spin inline-block h-5 w-5 text-gray-500" />
              ) : (
                "여기에 제출한 포트폴리오의 내용이 표시됩니다."
              )}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalFileUploadForm;
