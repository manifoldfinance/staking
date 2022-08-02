import create from 'zustand';

const prefix: string = 'Invariant failed';

export function invariant(condition: boolean, message?: string): void {
  if (condition) {
    return;
  }

  throw new Error(`${prefix}: ${message || ''}`);
}

export type EmptyObject = Record<string, never>; // or {[k: string]: never}

export type State = {
  EmptyObject: Record<string, never>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const useWalletModal = create<State>((set, get) => ({
  EmptyObject: {},
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));

export default useWalletModal;
