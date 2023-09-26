'use client'

import { FC, createContext, useReducer } from "react";
import { UserType } from "./hocs/withAuth";

interface StoreProps {
  activeUser: UserType | null;
}

const initialState: StoreProps = {
  activeUser: null,
};

export const store = createContext<{
  state: StoreProps;
  dispatch: (t: ActionType) => void;
}>({ state: initialState, dispatch: () => null });

export enum ActionTypes {
  UpdateUser = "updateUser",
}

type ActionType = {
  type: ActionTypes.UpdateUser;
  payload: UserType | null;
}

const reducer = (state: StoreProps, action: ActionType): StoreProps => {
  if (action.type === ActionTypes.UpdateUser) {
    return {
      ...state,
      activeUser: action.payload,
    };
  }
  return state;
};

const StoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { Provider } = store;

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};


export default StoreProvider