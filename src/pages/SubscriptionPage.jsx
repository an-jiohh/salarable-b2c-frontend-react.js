import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  MessageSquare,
  GraduationCap,
  PlaySquare,
  Building2,
  HelpCircle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">이용권</h1>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-500"
            >
              이용권 인증하러 가기
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="my-subscription" className="mb-8">
            <TabsList>
              <TabsTrigger value="my-subscription">나의 이용권</TabsTrigger>
              <TabsTrigger value="subscription-guide">이용권 구매</TabsTrigger>
              <TabsTrigger value="purchase-history">구매내역</TabsTrigger>
            </TabsList>

            <TabsContent value="my-subscription">
              {/* Active Subscriptions */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">사용중인 이용권</h2>
                <Card className="bg-gray-50">
                  <CardContent className="flex items-center justify-center h-32 text-gray-500">
                    사용중인 이용권이 없습니다.
                  </CardContent>
                </Card>

                <h2 className="text-lg font-semibold">보유중인 이용권</h2>
                <Card className="bg-gray-50">
                  <CardContent className="flex items-center justify-center h-32 text-gray-500">
                    보유중인 이용권이 없습니다.
                  </CardContent>
                </Card>

                <h2 className="text-lg font-semibold">사용완료 이용권</h2>
                <Card className="bg-gray-50">
                  <CardContent className="flex items-center justify-center h-32 text-gray-500">
                    사용완료된 이용권이 없습니다.
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subscription-guide">
              <div className="text-center text-gray-500">
                이용권 구매 가이드가 표시됩니다.
              </div>
            </TabsContent>

            <TabsContent value="purchase-history">
              <div className="text-center text-gray-500">
                구매 내역이 표시됩니다.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon: Icon, text, active }) => (
  <div
    className={cn(
      "flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer",
      active
        ? "bg-purple-50 text-purple-500"
        : "text-gray-600 hover:bg-gray-100"
    )}
  >
    <Icon size={20} />
    <span>{text}</span>
  </div>
);

export default SubscriptionPage;
