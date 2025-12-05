// Auth state type only — no implementation details here.
export type AuthState = {
  token: string | null;
  isHydrated: boolean;

  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  hydrate(): Promise<void>;
};
