import { useAppDispatch } from "../hooks/redux-hooks";
import { setIssues, setLinks } from "../redux/issuesSlice";
import { getAllIssues } from "../redux/operations";
import { EventTargetType } from "../types";
import Container from "./Container";

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
  };
  return (
    <div>
      <Container>
        <form onSubmit={submitHandler}>
          <label>
            <p>Find repo issues</p>
            <input
              required
              pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              type="url"
              name="searchQuery"
              placeholder="Enter repo URL"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Container>
    </div>
  );
};

export default SearchBar;
