import React from "react";
import { ToastContainer, toast } from "react-toastify";

import { useAppSelector } from "../hooks/redux-hooks";
import { selectError, selectIsLoading, selectIssues } from "../redux/selectors";
import { StateKeys } from "../types";

import List from "./List";
import IssuesColumn from "./IssuesColumn";
import SearchBar from "./SearchBar";
import LinksChain from "./LinksChain";

import Loader from "./Loader";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const issues = useAppSelector(selectIssues);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const stateKeys: StateKeys = ["all", "open", "closed"];

  React.useEffect(() => {
    if (!error) return;

    toast.error("Sorry, we have some problem here! :(", {
      autoClose: 3000,
    });
  }, [error]);

  return (
    <div>
      <SearchBar />
      {!error && <LinksChain />}
      {isLoading && <Loader />}
      {issues.length > 0 && !error && (
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
