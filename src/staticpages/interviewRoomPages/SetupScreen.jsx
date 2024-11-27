import Recat, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import SetupContext from "@/staticpages/interviewRoomPages/SetupProvider";
import { Check, Speaker } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const SetupScreen = ({ onNext }) => {
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
    questionRef,
    questionCount,
    setQuestionCount,
  } = useContext(SetupContext);

  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState("");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { interviewId } = useParams();
  const RECONNECT_TIMEOUT = 3000;

  console.log(questionRef.current);

  const startQuestion = () => {
    onNext();
  };

  useEffect(() => {
    // 웹캠 설정
    const setupWebcam = async () => {
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: {
            deviceId: selectedAudioDeviceId
              ? { exact: selectedAudioDeviceId }
              : undefined,
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
        }
      } catch (error) {
        console.error("웹캠 접근 실패:", error);
      }
    };

    // 초기 오디오 디바이스 갖고오기
    const getAudioDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(
        (device) => device.kind === "audioinput"
      );
      setAudioDevices(audioInputs);
      if (audioInputs.length > 0) {
        setSelectedAudioDeviceId(audioInputs[0].deviceId);
      }
    };

    getAudioDevices();
    setupWebcam();
  }, [interviewId]);

  useEffect(() => {
    // 오디오 스트림 설정
    const setupAudioStream = async () => {
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: {
            deviceId: selectedAudioDeviceId
              ? { exact: selectedAudioDeviceId }
              : undefined,
          },
        });
        if (audioRef.current) {
          audioRef.current.srcObject = streamRef.current;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
        }
      } catch (error) {
        console.error("오디오 스트림 설정 실패:", error);
      }
    };

    setupAudioStream();

    // return () => {
    //   if (audioRef.current?.srcObject) {
    //     audioRef.current.srcObject.getTracks().forEach((track) => track.stop());
    //   }
    // };
  }, [selectedAudioDeviceId]);

  const playAudioTest = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 볼륨 조절
      audioRef.current.play();
      setIsAudioPlaying(true);

      setTimeout(() => {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }, 5000); // 5초 후 자동 중지
    }
  };

  return (
    <div className="pt-[72px] h-screen">
      <div className="max-w-7xl mx-auto p-6 pt-0">
        <div className="text-center mb-8">
          {/* <h1 className="text-xl font-medium mb-8">
            연결된 기기를 확인해 주세요
          </h1> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Instructions */}
          <Card>
            <CardContent className="pt-6">
              {/* Microphone Guide */}
              <div className="mb-8">
                <h2 className="font-medium mb-4">마이크 테스트 가이드</h2>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>마이크가 PC(노트북)에 연결되어 있는지 확인해 주세요.</li>
                  <li>상단 탭의 마이크 권한을 '허용'으로 선택해 주세요.</li>
                  <li>영상은 녹화되지 않으며 음성만 녹음됩니다.</li>
                </ul>
              </div>

              {/* Sound */}
              <div className="mb-8">
                <h2 className="font-medium mb-4">소음을 주의해주세요</h2>
                <ul className="space-y-2 text-sm text-gray-600 list-decimal pl-4">
                  <li>조용한 공간에서 면접을 진행해 주세요.</li>
                  <li>
                    이어폰 사용 시 마이크와 닿는 옷 또는 미디어폰 때문에 소음이
                    생길 수 있으니 주의해 주세요.
                  </li>
                  <li>다른 사람의 움직이 녹화되지 않도록 해 주세요.</li>
                </ul>
              </div>

              {/* Important Points */}
              <div className="mb-8">
                <h2 className="font-medium mb-4">오류를 일으키는 주요원인</h2>
                <ul className="space-y-2 text-sm text-gray-600 list-decimal pl-4">
                  <li>
                    이미지 사용 중 하울링이 발생하면 소리가 커져서 음성 검출이
                    어려워질 수 있습니다.
                  </li>
                  <li>
                    이어폰 사용 시에는 마이크가 있는 기기를 사용해 주세요.
                  </li>
                  <li>
                    음성 전달에 영향을 미치는 마스크를 착용하지 말아 주세요.
                  </li>
                </ul>
              </div>

              {/* Additional Notes */}
              <div>
                <h2 className="font-medium mb-4">답변 주의사항</h2>
                <ul className="space-y-2 text-sm text-gray-600 list-decimal pl-4">
                  <li>
                    소리가 작거나 발음이 부정확하면 음성 인식이 어려울 수
                    있습니다.
                  </li>
                  <li>답변할 때 정확한 음성과 그기로 답변해 주세요.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Right side - Preview and Controls */}
          <div className="space-y-4">
            <Card>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="w-full h-full bg-gray-200">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full object-cover rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </Card>

            <div className="flex items-center space-x-2">
              <div className="flex-grow">
                <Select onValueChange={setSelectedAudioDeviceId}>
                  <SelectTrigger>
                    <SelectValue placeholder="마이크를 선택해주세요." />
                  </SelectTrigger>
                  <SelectContent>
                    {audioDevices.map((device) => (
                      <SelectItem key={device.deviceId} value={device.deviceId}>
                        {device.label || `Microphone ${device.deviceId}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-1">
                {isAudioPlaying ? (
                  <Speaker className="h-4 w-4 text-green-500 animate-pulse" />
                ) : (
                  <Check className="h-4 w-4 text-green-500" />
                )}
                <span className="text-sm text-green-500">
                  {isAudioPlaying ? "테스트 중" : "연결됨"}
                </span>
              </div>
            </div>
            {/* 마이크 테스트 그래프 */}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={playAudioTest}
              >
                마이크 테스트
              </Button>
              <Button
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={startQuestion}
              >
                연결 확인
              </Button>
            </div>
            {/* <div className="h-16 bg-gray-100 rounded-lg overflow-hidden flex items-end p-2"></div> */}
            <audio ref={audioRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
