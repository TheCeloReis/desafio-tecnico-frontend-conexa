import * as React from "react";
import { loginWithEmailAndPassword } from "./api";

let token: string | null = null;

export function getToken(): string | null {
  return token;
}

type StateType = {
  name: string | null;
  token: string | null;
  loading: boolean;
};

type ActionType =
  | { type: "LOGIN"; name: string; token: string }
  | { type: "LOADING" }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" };

const initialState: StateType = {
  name: null,
  token: null,
  loading: false,
};

const AuthContext = React.createContext(
  null as unknown as { state: StateType; dispatch: React.Dispatch<ActionType> }
);

function userReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "LOGIN": {
      token = action.token;

      return {
        name: action.name,
        token: action.token,
        loading: false,
      };
    }

    case "LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "LOGIN_ERROR": {
      return {
        ...state,
        loading: false,
      };
    }

    case "LOGOUT": {
      token = null;

      return {
        name: null,
        token: null,
        loading: false,
      };
    }

    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return {
    isLoggedIn: !!context.state.token,
    isLoading: context.state.loading,

    user: context.state.name,
    token: context.state.token,

    logout: () => context.dispatch({ type: "LOGOUT" }),
    login: async (email: string, password: string) => {
      context.dispatch({ type: "LOADING" });

      try {
        const response = await loginWithEmailAndPassword(email, password);

        context.dispatch({
          type: "LOGIN",
          name: response.name,
          token: response.token,
        });
      } catch (error) {
        context.dispatch({ type: "LOGIN_ERROR" });

        throw error;
      }
    },
  };
}

export { AuthProvider };
