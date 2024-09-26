"use client";
import { useEffect, useState, useRef } from "react";
import QuestionForm from "../../components/QuestionForm";
import axios from "axios";
import { ArrowDownCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStreamingResponse } from "@/hooks/useStreaming";
import SkeletonLoader from "@/components/SkeletonLoader";
import ReactMarkdown from "react-markdown";

interface ChatHistory {
  id: number;
  query_text: string;
  answer_text: string;
  created_at: string;
}

export default function HomePage() {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [showCustomQuestion, setShowCustomQuestion] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { response, isLoading, error, streamResponse } = useStreamingResponse();
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>();

  const cleanText = (text: string) => {
    return text.replace(/^["'\s]+|["'\s]+$/g, "");
  };

  useEffect(() => {
    async function getChatHistory() {
      console.log("Fetching chat history");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL!}/get-chat-history`,
          { withCredentials: true }
        );
        console.log(response.data.length);
        if (response.status === 200) {
          const cleanedChatHistory = response.data.map((chat: ChatHistory) => ({
            ...chat,
            query_text: cleanText(chat.query_text),
            answer_text: chat.answer_text.replace(/\s*\[DONE\]\s*$/, ""),
          }));
          setChatHistory(cleanedChatHistory);
        }
        if (response.data.length > 0) {
          setShowCustomQuestion(false);
        }
      } catch (error: any) {
        console.error("Error fetching chat history", error.message);
      }
    }

    getChatHistory();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_URL!}/logout`, {
        withCredentials: true,
      });
      window.location.href = "/";
    } catch (error: any) {
      console.error("Error logging out", error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-full">
      <header className="bg-white shadow-sm p-4 flex flex-row justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Kanoon AI</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </header>

      <main className="flex-grow overflow-hidden flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto py-40 px-4 space-y-4 "
        >
          {chatHistory.length > 0 ? (
            chatHistory.map((chat) => (
              <div key={chat.id} className="flex flex-col w-full">
                <div className="flex justify-end mb-2">
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-md">
                    <p>{chat.query_text}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-lg">
                    <p>{chat.answer_text}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {new Date(chat.created_at).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              <p>No chat history available</p>
              <p>Start a conversation by asking a question below!</p>
            </div>
          )}
          {error && <p className="mt-2 text-red-600">Error: {error}</p>}
          {currentQuestion && (
            <div className="mt-4 p-4 w-full bg-white rounded-lg shadow overflow-y-auto">
              <div className="rounded-lg w-full p-5 flex flex-row justify-end">
                <p className="bg-slate-200 p-5 rounded-lg">{currentQuestion}</p>
              </div>
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          )}

          {isStreaming && <SkeletonLoader />}
        </div>
        <QuestionForm
          showCustomQuestion={showCustomQuestion}
          setCurrentQuestion={setCurrentQuestion}
          setIsStreaming={setIsStreaming}
          isStreaming={isStreaming}
          streamResponse={streamResponse}
          response={response}
        />
        <div className="sticky bottom-24 right-4 flex justify-end">
          <button
            onClick={scrollToBottom}
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors duration-200"
          >
            <ArrowDownCircle size={24} />
          </button>
        </div>
      </main>
    </div>
  );
}
