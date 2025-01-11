import { useState } from "react";
import { NewsArticle, NewsResponse } from "../types/news";
export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchNews = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const apiKey = process.env.EXPO_PUBLIC_NEWS_API_KEY;
      const baseUrl = process.env.EXPO_PUBLIC_NEWS_API_BASE_URL;

      if (!apiKey) {
        throw new Error("API key is not configured");
      }

      const response = await fetch(`${baseUrl}?q=${query}&apiKey=${apiKey}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data: NewsResponse = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
        throw new Error(data.status || "Failed to fetch news");
      }

      setArticles(data.articles);
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch news. Please try again."
      );
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    articles,
    isLoading,
    error,
    searchNews,
  };
};
