import React, { createContext, useContext, useReducer } from 'react';
import { Library } from '../helpers/LibraryHelpers';

type LibraryState = {
  library: Library;
  areaId: string;
  issueId: string;
};

type LibraryAction = {
  type: LibraryActionType;
  payload: string;
};

export enum LibraryActionType {
  SetAreaId,
  SetIssueId,
}

const LibraryContext = createContext<{
  state: LibraryState;
  dispatch: React.Dispatch<LibraryAction>;
}>({
  state: {} as LibraryState,
  dispatch: {} as React.Dispatch<LibraryAction>,
}); // type gymnastics - fuck you.

export const LibraryProvider: React.FC<{
  children: React.ReactNode;
  library: Library;
  areaId: string;
  issueId: string;
}> = props => {
  const [state, dispatch] = useReducer(libraryReducer, {
    library: props.library,
    areaId: props.areaId,
    issueId: props.issueId,
  });

  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => {
  return useContext(LibraryContext);
};

export const libraryReducer = (state: LibraryState, action: LibraryAction) => {
  switch (action.type) {
    case LibraryActionType.SetAreaId:
      if (!state.library.issue[state.issueId].pdfs[action.payload]) {
        return { ...state, areaId: action.payload, issueId: '0' };
      } else {
        return { ...state, areaId: action.payload };
      }
    case LibraryActionType.SetIssueId:
      return { ...state, issueId: action.payload };
    default:
      return state;
  }
};
