interface IProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>(props: IProps<T>) {
  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {props.items.map(props.renderItem)}
    </ul>
  );
}

export default List;
