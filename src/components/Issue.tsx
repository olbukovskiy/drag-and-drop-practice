import React from "react";
import { Issue } from "../types";

const IssueComponent: React.FunctionComponent<Issue> = ({
  comments,
  created_at,
  id,
  login,
  number,
  title,
}) => {
  const dragStartHandler = (event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("text", id);
  };

  return (
    <li
      id={id}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        outline: "1px solid red",
      }}
      draggable="true"
      className="draggable"
      onDragStart={dragStartHandler}
    >
      <h2>{title}</h2>
      <p>#{number}</p>
      <p>Opened{new Date(created_at).getDay()} ago</p>
      <p>{login}</p>
      <p>Comments: {comments}</p>
    </li>
  );
};

export default React.memo(IssueComponent);
