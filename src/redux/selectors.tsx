import { Issue } from "../types";
import { RootStore } from "./store";

const selectCurrentIssues = (state: RootStore, name: string): Issue[] => {
  const allIssues = state.issues.issues;
  switch (name) {
    case "all":
      return allIssues.all;
    case "open":
      return allIssues.open;
    case "closed":
      return allIssues.closed;
    default:
      return allIssues.all;
  }
};

const selectIssues = (state: RootStore) => state.issues.issues;

const selectIsLoading = (state: RootStore) => state.issues.isLoading;

const selectError = (state: RootStore) => state.issues.error;

const selectLinks = (state: RootStore) => state.issues.links;

export {
  selectError,
  selectIsLoading,
  selectCurrentIssues,
  selectLinks,
  selectIssues,
};
