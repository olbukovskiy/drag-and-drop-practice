import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootStore } from "./store";
import { IssuesStates } from "./issuesSlice";
import { SearchQueryParts, ResponseType, Issue } from "../types";
import { vars } from "../vars";

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootStore;
  dispatch: AppDispatch;
}>();

export const getAllIssues = createAppAsyncThunk<IssuesStates, SearchQueryParts>(
  "issues/getAllIssues",
  async ({ owner, repo }, thunkAPI) => {
    try {
      const response = await fetch(
        `${vars.base_url}/${owner}/${repo}/issues?sort=created&per_page=20&page=1`
      );

      if (!response.ok) {
        throw new Error(response.status.toString());
      }

      const parsedResponse: Promise<ResponseType[]> = await response.json();

      const allData: Issue[] = (await parsedResponse).map(
        ({ id, user: { login }, number, comments, created_at, title }) => {
          return {
            id: id.toString(),
            login,
            number,
            comments,
            created_at,
            state: "all",
            title,
          };
        }
      );

      const all = allData.filter((item) => item.state === "all");
      const open = allData.filter((item) => item.state === "open");
      const closed = allData.filter((item) => item.state === "closed");

      return { all, open, closed };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
