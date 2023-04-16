import React, { useRef, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

import IssueComponent from "./Issue";
import { selectIssues, selectLinks } from "../redux/selectors";
import { changeIssueStatus } from "../redux/issuesSlice";
import { ChangeData } from "../types";

type Props = {
  name: string;
};

const IssuesColumn: React.FunctionComponent<Props> = ({ name }) => {
  const dropZoneElement = useRef<HTMLUListElement>(null);
  const issues = useAppSelector(selectIssues);
  const { repo } = useAppSelector(selectLinks);

  const currentStateIssues = useMemo(() => {
    const filteredIssues = issues.filter((issue) => issue.state === name);
    return filteredIssues;
  }, [issues, name]);

  const dispatch = useAppDispatch();

  const dropHandler = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    const draggableElementData = event.dataTransfer.getData("text/plain");
    const {
      id,
      result,
      state,
      whatId,
    }: ChangeData & { result: number; whatId: string } =
      JSON.parse(draggableElementData);

    dispatch(changeIssueStatus({ id, state }));

    const targetElem = document.getElementById(id);

    if (result > 0) {
      targetElem?.insertBefore(
        document.getElementById(whatId) as HTMLElement,
        targetElem
      );
    }
    globalThis.localStorage.setItem(`${repo}`, JSON.stringify(issues));
  };

  const dragOverHandler = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & HTMLElement;
    const { id: whatId }: ChangeData = JSON.parse(
      event.dataTransfer.getData("text/plain")
    );

    if (target.classList.contains("draggable")) {
      const { top, height } = target.getBoundingClientRect();
      const result = event.clientY - top - height / 2;
      const data = JSON.stringify({
        result,
        id: target.id,
        state: name,
        whatId,
      });
      event.dataTransfer.setData("text/plain", data);
    }
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
        ref={dropZoneElement}
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
        {currentStateIssues.map((item, index) => (
          <IssueComponent {...item} key={item.id} />
        ))}
      </ul>
    </li>
  );
};

export default IssuesColumn;
