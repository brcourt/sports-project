import { Crumbs } from "../../components/Breadcrumbs";
import Players from "../../views/Players";

const PlayersRoute = () => {
  return (
    <>
      <Crumbs links={[{ title: "Players", href: "/players" }]} />
      <Players />
    </>
  );
};

export default PlayersRoute;
