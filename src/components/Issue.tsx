import React from "react";
import { Issue } from "../types";

const IssueComponent: React.FunctionComponent<Issue> = ({
  comments,
  created_at,
  id,
  login,
  number,
  title,
  onDragEnd,
  onDragStart,
}) => {
  return (
    <li
      id={id}
      style={{
        display: "flex",
        flexDirection: "column",
        height: 200,
        gap: 5,
        outline: "1px solid red",
      }}
      draggable="true"
      className="draggable"
      onDragStart={(event: React.DragEvent<HTMLLIElement>) => {
        if (typeof onDragStart !== "undefined") {
          onDragStart(event, id);
        }
      }}
      onDragEnd={() => {
        if (typeof onDragEnd !== "undefined") {
          onDragEnd(id);
        }
      }}
    >
      <h2>{title}</h2>
      <p>#{number}</p>
      <p>Opened{new Date(created_at).getDay()} days ago</p>
      <p>{login}</p>
      <p>Comments: {comments}</p>
    </li>
  );
};

export default React.memo(IssueComponent);
