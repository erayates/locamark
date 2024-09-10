import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  isError: string | null;
}

type Fetcher<T> = () => Promise<{ data: T; success: boolean }>;

// Custom hook for fetching data
export function useFetch<T>(fetcher: Fetcher<T>): FetchState<T> {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    isError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setFetchState({ data: null, isLoading: true, isError: null });

      try {
        const response = await fetcher();
        if (response.success) {
          setFetchState({
            data: response.data,
            isLoading: false,
            isError: null,
          });
        } else {
          setFetchState({
            data: null,
            isLoading: false,
            isError: "Failed to fetch data",
          });
        }
      } catch (err) {
        setFetchState({
          data: null,
          isLoading: false,
          isError: "An error occurred while fetching data",
        });
      }
    };

    fetchData();
  }, [fetcher]);

  return fetchState;
}
