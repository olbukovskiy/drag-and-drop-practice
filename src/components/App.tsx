import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setIsShown } from "../redux/issuesSlice";
import {
  selectIsShown,
  selectError,
  selectIsLoading,
} from "../redux/selectors";
import { StateKeys } from "../types";

import List from "./List";
import IssuesColumn from "./IssuesColumn";
import SearchBar from "./SearchBar";
import LinksChain from "./LinksChain";
import Loader from "./Loader";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const isShown = useAppSelector(selectIsShown);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const stateKeys: StateKeys = ["all", "open", "closed"];

  useEffect(() => {
    if (!error) return;

    dispatch(setIsShown(false));
    toast.error("Sorry, we have some problem here! :(", {
      autoClose: 3000,
    });
  }, [error, dispatch]);

  return (
    <div className="wrapper">
      <SearchBar />
      {isShown && !error && <LinksChain />}
      {isLoading && <Loader />}
      {isShown && !error && (
        <List
          items={stateKeys}
          renderItem={(item) => <IssuesColumn name={item} key={item} />}
        />
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
