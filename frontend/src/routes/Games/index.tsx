import { Crumbs } from "../../components/Breadcrumbs";
import Games from "../../views/Games";

const GamesRoute = () => {
  return (
    <>
      <Crumbs links={[{ title: "Games", href: "/games" }]} />
      <Games />
    </>
  );
};

export default GamesRoute;
