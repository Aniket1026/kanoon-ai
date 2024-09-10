"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useStreamingResponse } from "@/hooks/useStreaming";
import ReactMarkdown from 'react-markdown';
import QuestionCard from "./QuestionCard";
import SkeletonLoader from "./SkeletonLoader";

const dummyQuestions = [
  {
    question: "What are the fundamental rights in the Indian Constitution?",
    description: "Learn about the basic rights guaranteed to all citizens of India."
  },
  {
    question: "The Judicial System of India",
    description: "What are the three levels of the Indian judiciary"
  },
  {
    question: "What is the structure of the Indian judiciary?",
    description: "Explore the organization of courts in India's legal system."
  },
];


export default function QuestionForm({ showCustomQuestion }: { showCustomQuestion: boolean }) {
  const [query, setQuery] = useState("");
  const [CustomQuestion, setCustomQuestion] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const { response, isLoading, error, streamResponse } = useStreamingResponse()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuery("");
    setCustomQuestion(false);
    setCurrentQuestion(query);
    setIsStreaming(true);
    await streamResponse(query);
  };

  const handleCardClick = async (question: string) => {
    setCustomQuestion(false);
    setCurrentQuestion(question);
    setIsStreaming(true);
    await streamResponse(question);
    console.log("Question: ", currentQuestion);
  }

  useEffect(() => {
    if (response && response.length > 0) {
      setIsStreaming(false);
    }
  }, [response]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow overflow-y-auto p-4 pb-24">
        {CustomQuestion && showCustomQuestion && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {dummyQuestions.map((q, index) => (
              <QuestionCard
                key={index}
                question={q.question}
                description={q.description}
                onAsk={handleCardClick}
              />
            ))}
          </div>
        )}

        {error && <p className="mt-2 text-red-600">Error: {error}</p>}
        {currentQuestion && (
          <div className="mt-4 p-4 w-full bg-white rounded-lg shadow overflow-y-auto">
            <div className="rounded-lg w-full p-5 flex flex-row justify-end">
              <p className="bg-slate-200 p-5 rounded-lg">
                {currentQuestion}
              </p>
            </div>
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}

        {isStreaming && <SkeletonLoader />}

        <form onSubmit={handleSubmit} className="flex w-full mt-4 p-6 fixed bottom-5 left-5 ">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about the Indian Constitution"
            className="p-2 outline-none flex flex-grow bg-gray-200 rounded-lg"
          />
          <Button type="submit" className="rounded-r-lg mx-4">
            {isStreaming ? "Asking..." : "Ask"}
          </Button>
        </form>
      </div>
    </div>
  );
}