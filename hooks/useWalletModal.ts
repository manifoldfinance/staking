import create from 'zustand';

export type State = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const useWalletModal = create<State>((set, get) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));

export default useWalletModal;
