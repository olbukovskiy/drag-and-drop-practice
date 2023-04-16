import { RootStore } from "./store";

const selectIssues = (state: RootStore) => state.issues.issues;

const selectIsLoading = (state: RootStore) => state.issues.isLoading;

const selectError = (state: RootStore) => state.issues.error;

const selectLinks = (state: RootStore) => state.issues.links;

export { selectError, selectIsLoading, selectIssues, selectLinks };
