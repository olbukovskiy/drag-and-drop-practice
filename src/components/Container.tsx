type Props = {
  children: React.ReactNode;
};

const Container: React.FunctionComponent<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Container;
