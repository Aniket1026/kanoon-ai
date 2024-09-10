import { useState, useCallback } from "react";

export const useStreamingResponse = () => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const streamResponse = useCallback(async (query: string) => {
    setIsLoading(true);
    setResponse("");
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL!}/ask-question`, {
        method: "POST",
        headers: {
          "Content-Type": "text/event-stream",
        },
        body: query,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Failed to get reader from response body");
      const decoder = new TextDecoder();
      setIsLoading(false);
      while (true) {
        const { done, value } = await reader?.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        const parsedLines = lines
        .map((line) => line.replace(/^data: /, "").trim())
        .filter((line) => line !== "" && line !== "[DONE]");
        
        for (const parsedLine of parsedLines) {
          setResponse((prev) => prev + parsedLine + " ");
        }
      }

    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  }, []);

  console.log(response);
  return { response, isLoading, error, streamResponse };
};