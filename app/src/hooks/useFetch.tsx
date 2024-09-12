import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  isError: string | null;
}

type Fetcher<T> = () => Promise<AxiosResponse<T>>;

export function useFetch<T>(fetcher: Fetcher<T>): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    isError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, isLoading: true, isError: null });

      try {
        const response = await fetcher();
        if (response.status >= 200 && response.status < 300) {
          setState({
            data: response.data,
            isLoading: false,
            isError: null,
          });
        } else {
          setState({
            data: null,
            isLoading: false,
            isError: "Failed to fetch data",
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setState({
          data: null,
          isLoading: false,
          isError: "An error occurred while fetching data",
        });
      }
    };

    fetchData();
  }, [fetcher]);

  return state;
}
