import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { ChangeData, Issue, Links } from "../types";
import { getAllIssues } from "./operations";

type IssuesSliceState = {
  issues: Issue[];
  links: Links;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialValues: IssuesSliceState = {
  issues: [],
  links: { owner: "", repo: "" },
  isLoading: false,
  error: null,
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState: initialValues,
  reducers: {
    changeIssueStatus(state, action: PayloadAction<ChangeData>) {
      for (const issue of state.issues) {
        if (issue.id === action.payload.id) {
          issue.state = action.payload.state as string;
          break;
        }
      }
    },
    setLinks(state, action: PayloadAction<Links>) {
      state.links = { ...action.payload };
    },
    setIssues(state, action: PayloadAction<Issue[]>) {
      state.issues = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllIssues.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.issues = action.payload;
    });
    builder.addCase(getAllIssues.rejected, (state, action) => {
      state.isLoading = false;
      state.issues = [];
      state.links = { owner: "", repo: "" };
      if (action.payload) {
        state.error = action.payload;
      }
    });
    builder.addCase(getAllIssues.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { changeIssueStatus, setLinks, setIssues } = issuesSlice.actions;
