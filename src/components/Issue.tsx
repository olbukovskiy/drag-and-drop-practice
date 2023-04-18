import React from "react";
import { ListGroup, Col } from "react-bootstrap";
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

  const calcDateOfCreation = (date: string) => {
    return new Date(date).getDay();
  };

  const mouseOverHandler = (event: React.DragEvent<HTMLLIElement>) => {};

  return (
    <ListGroup.Item
      id={id}
      as="li"
      draggable="true"
      className="draggable my-3 border-1"
      onDragStart={dragStartHandler}
      style={{ borderWidth: 1, borderRadius: 5 }}
    >
      <Col>
        <h2 style={{ marginBottom: 10 }}>{title}</h2>
        <p>#{number}</p>
        <p>
          Opened {calcDateOfCreation(created_at)} day('s) ago by{" "}
          <span style={{ fontWeight: 600 }}>{login}</span>
        </p>
        <p>Comments: {comments}</p>
      </Col>
    </ListGroup.Item>
  );
};

export default React.memo(IssueComponent);
