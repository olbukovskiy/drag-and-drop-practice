import React from "react";
import { ListGroup } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { changeIssueStatus } from "../redux/issuesSlice";
import { selectIssues, selectLinks } from "../redux/selectors";
import useGetParams from "../hooks/useGetParams";

import IssueComponent from "./Issue";

type Props = {
  name: string;
};

const IssuesColumn: React.FunctionComponent<Props> = ({ name }) => {
  const dispatch = useAppDispatch();
  const { dragOverHandler, dropData, currentStateIssues } = useGetParams(name);
  const { repo } = useAppSelector(selectLinks);
  const allIssues = useAppSelector(selectIssues);

  const dropHandler = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    const issueId = event.dataTransfer.getData("text");

    dispatch(
      changeIssueStatus({
        id: issueId,
        state: dropData.state as string,
        index: dropData.index as number,
      })
    );

    globalThis.localStorage.setItem(`${repo}`, JSON.stringify(allIssues));
  };

  return (
    <ListGroup.Item
      as="li"
      style={{
        backgroundColor: "rgb(232, 240, 254)",
        borderRadius: 10,
        padding: 20,
        flexBasis: "calc((100% - 40px) / 3)",
        borderWidth: 2,
      }}
    >
      <h2
        style={{
          color: "#000",
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        {name}
      </h2>
      <ListGroup
        as="ul"
        data-name={name}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        style={{ height: "100%" }}
      >
        {currentStateIssues.map((item) => (
          <IssueComponent {...item} key={item.id} />
        ))}
      </ListGroup>
    </ListGroup.Item>
  );
};

export default IssuesColumn;
