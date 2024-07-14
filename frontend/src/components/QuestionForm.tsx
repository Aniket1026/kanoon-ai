"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStreamingResponse } from "@/hooks/useStreaming";
import ReactMarkdown from 'react-markdown';
import QuestionCard from "./QuestionCard";

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


export default function QuestionForm() {
  const [query, setQuery] = useState("");
  const [showCustomQuestion, setShowCustomQuestion] = useState(true);
  const { response, isLoading, error, streamResponse } = useStreamingResponse()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuery("");
    await streamResponse(query);
  };

  const handleCardClick = async (question: string) => {
    setShowCustomQuestion(false);
    setQuery(question);
    await streamResponse(question);
    setQuery("");
  }

  return (
    <div className="flex flex-col w-full">
      {showCustomQuestion && (
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

      {isLoading && <p className="mt-2 text-gray-600">Loading...</p>}
      {error && <p className="mt-2 text-red-600">Error: {error}</p>}
      {response && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow prose">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex w-full mt-4 p-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about the Indian Constitution"
          className="p-2 outline-none flex flex-grow bg-gray-200 rounded-lg"
        />
        <Button type="submit" className="rounded-r-lg mx-4">
          Ask
        </Button>
      </form>
    </div>
  );
}