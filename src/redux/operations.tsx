import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootStore } from "./store";
import { SearchQueryParts, ResponseType, Issue } from "../types";
import { vars } from "../vars";

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootStore;
  dispatch: AppDispatch;
}>();

export const getAllIssues = createAppAsyncThunk<Issue[], SearchQueryParts>(
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

      const data: Issue[] = (await parsedResponse).map(
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

      return data;
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
