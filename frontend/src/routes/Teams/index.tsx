import { Crumbs } from "../../components/Breadcrumbs";
import Teams from "../../views/Teams";

const TeamsRoute = () => {
  return (
    <>
      <Crumbs links={[{ title: "Teams", href: "/teams" }]} />
      <Teams />
    </>
  );
};

export default TeamsRoute;
