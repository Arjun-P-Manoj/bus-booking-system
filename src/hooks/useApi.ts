import { useState } from "react";
import { ApiResponse } from "../types";

interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
  headers?: Record<string, string>;
}

export function useApi() {
  const [loading, setLoading] = useState(false);

  const request = async <T>(config: RequestConfig): Promise<ApiResponse<T>> => {
    setLoading(true);
    try {
      const response = await fetch(config.url, {
        method: config.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        body: config.body,
      });

      const data = await response.json();
      setLoading(false);

      return {
        success: response.ok,
        data: data as T,
      };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  };

  return { request, loading };
} 