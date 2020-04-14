import React, { createContext, Dispatch, useReducer, useContext } from "react";
import ContextDevTool from "react-context-devtool";

type UserState = {
  email: string;
};

const UserStateContext = createContext<UserState | undefined>(undefined);

type Action = { type: "SET_EMAIL"; value: string };

type UserDispatch = Dispatch<Action>;
const UserDispatchContext = createContext<UserDispatch | undefined>(undefined);

function userReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case "SET_EMAIL": {
      console.log("is context", action.value);
      return {
        ...state,
        email: action.value,
      };
    }

    default:
      return state;
  }
}

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, dispatch] = useReducer(userReducer, {
    email: "",
  });

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={user}>
        <ContextDevTool
          context={UserStateContext}
          id="uniqContextId"
          displayName="UserState"
        />
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UserStateContext);
  if (!state) {
    throw new Error("UserProvider not found!");
  }
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) {
    throw new Error("UserProvider not found!");
  }
  return dispatch;
}
