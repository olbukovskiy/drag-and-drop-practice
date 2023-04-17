import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { ChangeData, Issue, Links } from "../types";
import { getAllIssues } from "./operations";

export type IssuesStates = { all: Issue[]; open: Issue[]; closed: Issue[] };

type IssuesSliceState = {
  issues: IssuesStates;
  links: Links;
  isLoading: boolean;
  isShown: boolean;
  error: SerializedError | null;
};

const initialValues: IssuesSliceState = {
  issues: { all: [], open: [], closed: [] },
  links: { owner: "", repo: "" },
  isLoading: false,
  isShown: false,
  error: null,
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState: initialValues,
  reducers: {
    changeIssueStatus(state, action: PayloadAction<ChangeData>) {
      const { id, state: issueState, index } = action.payload;
      const values = Object.entries(state.issues);
      let draggedIssue: Issue;

      values.forEach((value) => {
        const deletingIssueIndex = value[1].findIndex((item) => item.id === id);
        if (deletingIssueIndex !== -1) {
          draggedIssue = { ...value[1][deletingIssueIndex] };
          value[1].splice(deletingIssueIndex, 1);
        }
      });

      values.forEach((value) => {
        if (value[0] === issueState) {
          value[1].splice(index, 0, draggedIssue);
        }
      });

      const issuesData = Object.fromEntries(values);
      state.issues = issuesData as IssuesStates;
    },

    setLinks(state, action: PayloadAction<Links>) {
      state.links = { ...action.payload };
    },
    setIssues(state, action: PayloadAction<IssuesStates>) {
      state.issues = action.payload;
      state.error = null;
    },
    setIsShown(state, action: PayloadAction<boolean>) {
      state.isShown = action.payload;
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
      state.issues = { all: [], open: [], closed: [] };
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

export const { changeIssueStatus, setLinks, setIssues, setIsShown } =
  issuesSlice.actions;
