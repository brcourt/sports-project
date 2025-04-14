import { useParams } from "react-router-dom";
import { Crumbs } from "../../components/Breadcrumbs";
import SinglePlayer from "../../views/SinglePlayer";
import { GetPlayerName } from "../../components/Lookups/GetPlayerLink";

const SinglePlayerRoute = () => {
  const { playerId } = useParams();
  return (
    <>
      <Crumbs
        links={[
          { title: "Players", href: "/players" },
          {
            title: <GetPlayerName playerId={playerId} noLink={true} />,
            href: `/players/${playerId}`,
          },
        ]}
      />
      <SinglePlayer />
    </>
  );
};

export default SinglePlayerRoute;
