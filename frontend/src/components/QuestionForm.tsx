"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStreamingResponse } from "@/hooks/useStreaming";
import ReactMarkdown from 'react-markdown';

export default function QuestionForm() {
  const [query, setQuery] = useState("");
  const { response, isLoading, error, streamResponse } = useStreamingResponse()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await streamResponse(query);
    console.log('Executed');
  };

  return (
    <div className="flex flex-col w-full">
      {isLoading && <p className="mt-2 text-gray-600">Loading...</p>}
      {error && <p className="mt-2 text-red-600">Error: {error}</p>}
      {response && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow prose">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex w-full mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about the Indian Constitution"
          className="p-2 outline-none flex flex-grow bg-gray-100 rounded-l-lg"
        />
        <Button type="submit" className="rounded-r-lg">
          Ask
        </Button>
      </form>
    </div>
  );
}