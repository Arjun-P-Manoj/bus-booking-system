import { useState } from 'react';
import { ApiResponse } from '../types';
import { useAuth } from '../context/AuthContext';

interface RequestConfig extends RequestInit {
  url: string;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const request = async <T>({
    url,
    method = 'GET',
    headers = {},
    ...config
  }: RequestConfig): Promise<ApiResponse<T>> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
          ...headers,
        },
        ...config,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return {
        success: true,
        data: data as T,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    request,
  };
} 