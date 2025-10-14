import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useAxiosFetch<T = any>(
  url: string,
  config?: AxiosRequestConfig
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<T>(url, {
        timeout: 10000,
        ...config,
      });
      setData(response.data);
    } catch (err) {
      const e = err as AxiosError;
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [url, config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
