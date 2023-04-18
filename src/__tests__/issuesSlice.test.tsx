import { configureStore } from "@reduxjs/toolkit";
import { issuesSlice, IssuesStates } from "../redux/issuesSlice";
import { getAllIssues } from "../redux/operations";

describe("Test issues slice sync reducers", () => {
  let store;
  let dispatch;

  beforeEach(() => {
    store = configureStore({ reducer: issuesSlice.reducer });
    dispatch = store.dispatch;
  });

  test("changeIssueStatus reducer", () => {
    const initialState = {
      issues: {
        all: [
          { id: 1, state: "open" },
          { id: 2, state: "closed" },
        ],
        open: [{ id: 1, state: "open" }],
        closed: [{ id: 3, state: "closed" }],
      },
    };
    const action = {
      type: "issues/changeIssueStatus",
      payload: { id: 2, state: "open", index: 0 },
    };

    const newState = issuesSlice.reducer(initialState, action);

    expect(newState.issues.all[1]).toEqual(undefined);
    expect(newState.issues.open[0].id).toEqual(2);
    expect(newState.issues.closed.length).toEqual(1);
  });

  test("setLinks reducer", () => {
    const initialState = {
      links: { owner: "", repo: "" },
    };
    const action = {
      type: "issues/setLinks",
      payload: { owner: "test", repo: "test-repo" },
    };

    const newState = issuesSlice.reducer(initialState, action);

    expect(newState.links.owner).toEqual("test");
    expect(newState.links.repo).toEqual("test-repo");
  });

  test("setIssues reducer", () => {
    const initialState = {
      issues: {
        all: [],
        open: [],
        closed: [],
      },
    };
    const issues: IssuesStates = {
      all: [
        { id: 1, state: "open" },
        { id: 2, state: "closed" },
      ],
      open: [{ id: 1, state: "open" }],
      closed: [{ id: 2, state: "closed" }],
    };
    const action = {
      type: "issues/setIssues",
      payload: issues,
    };

    const newState = issuesSlice.reducer(initialState, action);

    expect(newState.issues.all).toEqual(issues.all);
    expect(newState.issues.open).toEqual(issues.open);
    expect(newState.issues.closed).toEqual(issues.closed);
  });

  test("setIsShown reducer", () => {
    const initialState = {
      isShown: false,
    };
    const action = {
      type: "issues/setIsShown",
      payload: true,
    };

    const newState = issuesSlice.reducer(initialState, action);

    expect(newState.isShown).toEqual(true);
  });
});

describe("Test getAllIssues async reducer", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        issues: issuesSlice.reducer,
      },
    });
  });

  it("should return all, open and closed issues for a given repo", async () => {
    const query = { owner: "facebook", repo: "react" };
    await store.dispatch(getAllIssues(query));

    const state = store.getState().issues;
    expect(state.issues.all.length).toBeGreaterThan(0);
    expect(state.issues.open.length).toBe(0);
    expect(state.issues.closed.length).toBe(0);
  });
});
