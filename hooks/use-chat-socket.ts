import { useEffect } from "react";

import { useSocket } from "@/components/providers/socket-provider";
import {
  ChatSocketProps,
  MessageWithMemberWithProfile,
} from "@/types/chat-socket-types";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook that handles socket events for a chat application.
 * Listens for `addKey` and `updateKey` events from the socket and updates the query data accordingly.
 *
 * @param {ChatSocketProps} props - The properties for the chat socket.
 * @param {string} props.addKey - The event key for adding a new message.
 * @param {string} props.updateKey - The event key for updating an existing message.
 * @param {string} props.queryKey - The query key for the chat messages.
 */
export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    /**
     * Updates the data in the query cache by replacing a specific message with a new message.
     *
     * @param message - The new message object that contains the updated message details.
     */
    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.map((page: any) => {
          return {
            ...page,
            items: page.item.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    /**
     * Updates the data in the query cache based on the received message.
     * If the query data is empty or there are no pages, it creates a new data structure with the received message.
     * Otherwise, it updates the existing data structure by adding the received message to the beginning of the items array.
     * @param message - The received message object that contains the message details along with the member and profile information.
     */
    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [message],
              },
            ],
          };
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    /**
     * Unregisters event listeners for the 'addKey' and 'updateKey' events on the socket object.
     *
     * @param {string} addKey - The event key for adding a new message.
     * @param {string} updateKey - The event key for updating an existing message.
     * @param {Socket} socket - The socket object.
     * @returns {void}
     */
    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
