import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

import IssueComponent from "./Issue";
import {
  selectCurrentIssues,
  selectIssues,
  selectLinks,
} from "../redux/selectors";
import { changeIssueStatus } from "../redux/issuesSlice";
import { ChangeData, Issue } from "../types";
import { RootStore } from "../redux/store";
import { type } from "os";

type Props = {
  name: string;
};

type RefData = {
  index: number;
  state: string;
};

const IssuesColumn: React.FunctionComponent<Props> = ({ name }) => {
  const dispatch = useAppDispatch();
  const { repo } = useAppSelector(selectLinks);
  const allIssues = useAppSelector(selectIssues);
  const currentStateIssues: Issue[] = useAppSelector((state: RootStore) => {
    return selectCurrentIssues(state, name);
  });
  const changeData = useRef<RefData | null>(null);

  const dropHandler = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    const whatId = event.dataTransfer.getData("text");
    console.log({
      id: whatId,
      state: changeData.current?.state as string,
      index: changeData.current?.index as number,
    });
    dispatch(
      changeIssueStatus({
        id: whatId,
        state: changeData.current?.state as string,
        index: changeData.current?.index as number,
      })
    );
    globalThis.localStorage.setItem(`${repo}`, JSON.stringify(allIssues));
  };

  const dragOverHandler = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & HTMLElement;
    let dropElementIndex: number = 0;
    let result: number;
    const targetIndex = currentStateIssues.findIndex(
      (item) => item.id === target.id
    );

    if (target.classList.contains("draggable")) {
      const { top, height } = target.getBoundingClientRect();
      result = event.clientY - top - height / 2;

      if (result > 0) {
        dropElementIndex = targetIndex + 1;
      }

      if (result < 0) {
        dropElementIndex = targetIndex - 1;
      }
    }

    const dropChangeData = {
      index: dropElementIndex,
      state: name,
    };

    changeData.current = dropChangeData;
  };

  return (
    <li
      className="column"
      style={{
        flexBasis: "calc((100% - 40px) / 3)",
        minWidth: 200,
        minHeight: 400,
        outline: "1px solid red",
      }}
    >
      <ul
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          borderBottom: "1px solid black",
          width: "100%",
          height: "100%",
        }}
      >
        {currentStateIssues.map((item) => (
          <IssueComponent {...item} key={item.id} />
        ))}
      </ul>
    </li>
  );
};

export default IssuesColumn;
