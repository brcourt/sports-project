import { useParams } from "react-router-dom";
import { Crumbs } from "../../components/Breadcrumbs";
import SingleGame from "../../views/SingleGame";
import { GetGameLink } from "../../components/Lookups/GetGameLink";

const SingleGameRoute = () => {
  const { gameId } = useParams();
  return (
    <>
      <Crumbs
        links={[
          { title: "Games", href: "/games" },
          {
            title: <GetGameLink gameId={gameId} noLink={true} />,
            href: `/games/${gameId}`,
          },
        ]}
      />
      <SingleGame />
    </>
  );
};

export default SingleGameRoute;
