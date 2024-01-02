import { ModalStore } from "@/interfaces/hooks-interface";
import { create } from "zustand";

/**
 * Creates a modal store using the Zustand library.
 * The modal store has properties for the modal type, data, and open state,
 * as well as functions for opening and closing the modal.
 *
 * @param {Function} set - A function provided by Zustand to update the state of the modal store.
 * @returns {ModalStore} An object representing the modal store with properties for the modal type, data, open state,
 * and functions for opening and closing the modal.
 */
/**
 * Closes the modal by updating the state of the modal store.
 */
export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
