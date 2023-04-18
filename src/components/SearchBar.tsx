import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setIsShown, setIssues, setLinks } from "../redux/issuesSlice";
import { getAllIssues } from "../redux/operations";
import { EventTargetType } from "../types";

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & EventTargetType;

    const searchQueryArray = target.searchQuery.value.split("/");
    const owner = searchQueryArray[3];
    const repo = searchQueryArray[4];

    const ownerLink = `https://github.com/${owner}`;
    const repoLink = `https://github.com/${owner}/${repo}`;

    const localStorageData = globalThis.localStorage.getItem(repoLink);

    if (localStorageData) {
      dispatch(setIssues(JSON.parse(localStorageData)));
    }

    if (!localStorageData) {
      dispatch(getAllIssues({ owner, repo }));
    }

    dispatch(setLinks({ owner: ownerLink, repo: repoLink }));
    dispatch(setIsShown(true));
  };
  return (
    <div style={{ padding: "30px 0 5px 0" }}>
      <Container>
        <Form onSubmit={submitHandler}>
          <Row style={{ justifyContent: "center" }}>
            <Col xs={9}>
              <Form.Group>
                <Form.Label htmlFor="basic-url" visuallyHidden>
                  Find repo issues
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="url"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    required
                    pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                    name="searchQuery"
                    placeholder="Enter repo URL. Example: https://github.com/facebook/react"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={3}>
              <Button
                type="submit"
                variant="outline-primary"
                style={{ width: "100%" }}
              >
                Load
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default SearchBar;
