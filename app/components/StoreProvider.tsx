'use client'

import { FC, createContext, useReducer } from "react";
import { UserType } from "./hocs/withAuth";

interface StoreProps {
  activeUser: UserType | null;
  modalState: boolean
}

const initialState: StoreProps = {
  activeUser: null,
  modalState: false
};

export const store = createContext<{
  state: StoreProps;
  dispatch: (t: ActionType) => void;
}>({ state: initialState, dispatch: () => null });

export enum ActionTypes {
  UpdateUser = "updateUser",
  SetModalState = "setModalState"
}

type ActionType = {
  type: ActionTypes.UpdateUser;
  payload: UserType | null;
} | {
  type: ActionTypes.SetModalState;
  payload: boolean;
}

const reducer = (state: StoreProps, action: ActionType): StoreProps => {
  if (action.type === ActionTypes.UpdateUser) {
    return {
      ...state,
      activeUser: action.payload,
    };
  }

  if(action.type === ActionTypes.SetModalState){
    return {
      ...state,
      modalState: action.payload
    }
  }

  return state;
};

const StoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { Provider } = store;

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};


export default StoreProvider