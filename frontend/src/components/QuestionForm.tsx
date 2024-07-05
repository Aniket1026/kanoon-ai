"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function QuestionForm() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

      const res = await fetch("http://localhost:8000/api/v1/ask-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });
    //    console.log(JSON.stringify({ query }))
      const data = await res.json();
    //   console.log(data)
    setResponse(data.response);
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
