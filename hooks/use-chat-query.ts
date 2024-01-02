import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import { ChatQueryProps } from "@/interfaces/hooks-interface";

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  /**
   * Fetches messages from an API.
   * 
   * @param {Object} options - The options for fetching messages.
   * @param {number} options.pageParam - The page parameter used to fetch messages from a specific page. Defaults to undefined.
   * @returns {Promise<Object>} - A promise that resolves to the parsed JSON response from the API.
   */
  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true }
    );

    const res = await fetch(url);
    return res.json();
  };

  /**
   * Creates an options object for the useInfiniteQuery hook.
   *
   * @param queryKey - An array containing the query key used to identify the query.
   * @param fetchMessages - A function that fetches messages from an API.
   * @param lastPage - The last page of messages returned from the API.
   * @param isConnected - A boolean indicating if the user is connected to the internet.
   * @returns An object containing the configuration options for the useInfiniteQuery hook.
   
   * Fetches data in a paginated manner using the useInfiniteQuery hook.
   *
   * @param options - An object containing the configuration options for the useInfiniteQuery hook.
   * @returns An object with properties data, fetchNextPage, hasNextPage, isFetchingNextPage, and status.
   */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage: any) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000,
    initialPageParam: undefined
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
