"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStreamingResponse } from "@/hooks/useStreaming";

export default function QuestionForm() {
  const [query, setQuery] = useState("");
  // const [response, setResponse] = useState("");
  const { response, isLoading, error, streamResponse } = useStreamingResponse()

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    await streamResponse(query);
    console.log('Executed');
  };

  return (
    <div className="flex flex-col w-full">
       {response && <p className="mt-4">{response}</p>}
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about the Indian Constitution"
          className="p-2 outline-none flex flex-grow bg-gray-100 rounded-lg"
        />
        <Button type="submit" className="rounded-r">
          Ask
        </Button>{" "}
      </form>
    </div>
  );
}
