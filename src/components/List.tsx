import { Container, ListGroup } from "react-bootstrap";

interface IProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>(props: IProps<T>) {
  return (
    <div style={{ padding: "30px 0 30px 0", height: "100%" }}>
      <Container>
        <ListGroup horizontal as="ul" style={{ height: "100%", gap: 20 }}>
          {props.items.map(props.renderItem)}
        </ListGroup>
      </Container>
    </div>
  );
}

export default List;
