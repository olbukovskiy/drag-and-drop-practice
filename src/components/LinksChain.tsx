import { Container, Row, Col, Button } from "react-bootstrap";
import { HiOutlineArrowRight } from "react-icons/hi";

import { useAppSelector } from "../hooks/redux-hooks";
import { selectLinks } from "../redux/selectors";

const LinksChain = () => {
  const { owner, repo } = useAppSelector(selectLinks);
  const ownerLinkArray = owner.split("/");
  const repoLinkArray = repo.split("/");

  return (
    <div style={{ padding: "5px 0" }}>
      <Container>
        <Row sm={4}>
          <Col style={{ maxWidth: "100%" }}>
            <Button
              style={{ width: "100%" }}
              as="a"
              href={owner}
              variant="outline-primary"
              target="_blank"
              rel="noreferrer"
            >
              {ownerLinkArray[ownerLinkArray.length - 1]}
            </Button>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
            }}
          >
            <HiOutlineArrowRight size={24} color="blue" />
          </Col>
          <Col style={{ maxWidth: "100%" }}>
            <Button
              style={{ width: "100%" }}
              as="a"
              variant="outline-primary"
              href={repo}
              target="_blank"
              rel="noreferrer"
            >
              {repoLinkArray[repoLinkArray.length - 1]}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LinksChain;
