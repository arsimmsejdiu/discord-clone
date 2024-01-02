import { ChatScrollProps } from "@/types/chat-scroll-type";
import { useEffect, useState } from "react";

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  /**
   * Determines whether more chat messages should be loaded when the user scrolls to the top of the chat.
   * 
   * @param chatRef - A reference to the chat container element.
   * @param shouldLoadMore - A flag indicating whether more chat messages should be loaded.
   * @param loadMore - A function to load more chat messages.
   */
  useEffect(() => {
    const topDiv = chatRef?.current;

    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop;

      if (scrollTop === 0 && shouldLoadMore) {
        loadMore()
      }
    };

    topDiv?.addEventListener("scroll", handleScroll);

    return () => {
      topDiv?.removeEventListener("scroll", handleScroll);
    }
  }, [shouldLoadMore, loadMore, chatRef]);

  /**
   * Scrolls to the bottom of a chat container when new messages are added.
   * It checks if the chat container has been initialized and if the user has scrolled to the bottom.
   * If these conditions are met, it scrolls to the bottom using the `scrollIntoView` method.
   * 
   * @param bottomRef - A reference to the bottom element of the chat container.
   * @param chatRef - A reference to the chat container element.
   * @param count - The number of chat messages.
   * @param hasInitialized - A flag indicating whether the chat container has been initialized.
   */
  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = chatRef.current;
    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }

      if (!topDiv) {
        return false;
      }

      const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    }

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [bottomRef, chatRef, count, hasInitialized]);
}