import {create} from 'zustand';

type AuthState = {
  authStatus: AuthStatus;
  setAuthStatus: (authStatus: AuthStatus) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  authStatus: 'checking',
  setAuthStatus: newAuthStatus => set({authStatus: newAuthStatus}),
}));
