import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

import IssueComponent from "./Issue";
import {
  selectCurrentIssues,
  selectIssues,
  selectLinks,
} from "../redux/selectors";
import { changeIssueStatus } from "../redux/issuesSlice";
import { Issue } from "../types";
import { RootStore } from "../redux/store";

type Props = {
  name: string;
};

type RefData = {
  index: number;
  state: string;
};

const IssuesColumn: React.FunctionComponent<Props> = ({ name }) => {
  const dispatch = useAppDispatch();
  const changeData = useRef<RefData | null>(null);

  const { repo } = useAppSelector(selectLinks);
  const allIssues = useAppSelector(selectIssues);
  const currentStateIssues: Issue[] = useAppSelector((state: RootStore) => {
    return selectCurrentIssues(state, name);
  });

  const dragStartHandler = (
    event: React.DragEvent<HTMLLIElement>,
    id: string
  ) => {
    document.getElementById(id)?.classList.add("dragging");
    event.dataTransfer.setData("text", id);
  };

  const dragEndHandler = (id: string) => {
    document.getElementById(id)?.classList.remove("dragging");
  };

  const dropHandler = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    const issueId = event.dataTransfer.getData("text");

    dispatch(
      changeIssueStatus({
        id: issueId,
        state: changeData.current?.state as string,
        index: changeData.current?.index as number,
      })
    );

    globalThis.localStorage.setItem(`${repo}`, JSON.stringify(allIssues));
  };

  const dragOverHandler = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();

    let dropElementIndex: number = currentStateIssues.length;
    let offset: number = Number.NEGATIVE_INFINITY;
    let draggableElement: Element | null = null;

    const nodeElementsArray = document
      .querySelector(`[data-name="${name}"]`)
      ?.querySelectorAll(".draggable:not(.dragging)");

    nodeElementsArray?.forEach((element) => {
      const { top, height } = element.getBoundingClientRect();
      const currentOffset = event.clientY - top - height;

      if (currentOffset < 0 && currentOffset > offset) {
        offset = currentOffset;
        draggableElement = element;
      }
    });

    console.log(offset);

    if (draggableElement == null) {
      dropElementIndex = currentStateIssues.length;
    } else {
      const targetIndex = currentStateIssues.findIndex((item) => {
        return item.id === draggableElement?.id;
      });

      if (targetIndex !== -1) {
        dropElementIndex = targetIndex;
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
        data-name={name}
        className="column"
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        style={{
          display: "flex",
          flexDirection: "column",

          borderBottom: "1px solid black",
          width: "100%",
          height: "100%",
        }}
      >
        {currentStateIssues.map((item) => (
          <IssueComponent
            onDragEnd={dragEndHandler}
            onDragStart={dragStartHandler}
            {...item}
            key={item.id}
          />
        ))}
      </ul>
    </li>
  );
};

export default IssuesColumn;
