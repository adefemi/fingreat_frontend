'use client'

import { FC, useReducer, createContext } from "react";
import { UserType } from "@/app/components/hoc/withAuth";

interface StoreType {
  activeUser: UserType | null;
  modalStatus: boolean;
}

export enum ActionTypes {
  UPDATE_USER = "updateUser",
  MODAL_STATUS = "modalStatus",
}

type ActionType = {
    type: ActionTypes.UPDATE_USER,
    payload: UserType
} | {
    type: ActionTypes.MODAL_STATUS,
    payload: boolean
}

const initialState: StoreType = {
  activeUser: null,
  modalStatus: false,
};

const reducer = (state: StoreType, action: ActionType): StoreType => {
  if (action.type === ActionTypes.UPDATE_USER) {
    return {
      ...state,
      activeUser: action.payload,
    };
  }
  if(action.type === ActionTypes.MODAL_STATUS){
    return {
        ...state,
        modalStatus: action.payload
    }
  }
  return state;
};

export const store = createContext<{
  state: StoreType;
  dispatch: (arg: ActionType) => void;
}>({ state: initialState, dispatch: () => null });

const StoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { Provider } = store;

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default StoreProvider