import { useParams } from "react-router-dom";
import { Crumbs } from "../../components/Breadcrumbs";
import SingleTeam from "../../views/SingleTeam";
import { GetTeamLink } from "../../components/Lookups/GetTeamName";

const SingleTeamRoute = () => {
  const { teamId } = useParams();
  return (
    <>
      <Crumbs
        links={[
          { title: "Teams", href: "/teams" },
          {
            title: <GetTeamLink teamId={teamId} noLink={true} />,
            href: `/teams/${teamId}`,
          },
        ]}
      />
      <SingleTeam />
    </>
  );
};

export default SingleTeamRoute;
