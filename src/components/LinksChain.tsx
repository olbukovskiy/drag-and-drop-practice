import { useAppSelector } from "../hooks/redux-hooks";
import { selectLinks } from "../redux/selectors";

const LinksChain = () => {
  const { owner, repo } = useAppSelector(selectLinks);
  const ownerLinkArray = owner.split("/");
  const repoLinkArray = repo.split("/");

  return (
    <div>
      <a href={owner} target="_blank" rel="noreferrer">
        {ownerLinkArray[ownerLinkArray.length - 1]}
      </a>
      <span>{`>`}</span>
      <a href={repo} target="_blank" rel="noreferrer">
        {repoLinkArray[repoLinkArray.length - 1]}
      </a>
    </div>
  );
};

export default LinksChain;
