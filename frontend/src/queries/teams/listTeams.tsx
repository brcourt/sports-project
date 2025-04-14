import { useQuery } from "@tanstack/react-query";
import { getTeam, listTeams } from "../../api/teams";

export function queryTeams() {
  const query = useQuery({
    queryKey: ["teams"],
    queryFn: listTeams,
  });

  return query;
}

export function querySingleTeam(teamId: string) {
  const query = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeam(teamId),
  });

  return query;
}

// export function queryAllTeams() {
//   const query = useQuery({
//     queryKey: ["pageTeams"],
//     queryFn: () => {
//       const result = paginateTeams();
//       let final_token = result.token;

//       while (final_token) {
//         const data = paginateTeams(final_token);
//         final_token = data.token;
//         result.teams = [...result.teams, ...data.teams];
//       }
//       return result;
//     },
//     placeholderData: keepPreviousData,
//   });

//   return query;
// }

// export function queryInfiniteTeams() {
//   const query = useInfiniteQuery({
//     queryKey: ["allTeams"],
//     queryFn: paginateTeams,
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => lastPage.token,
//   });

//   return query;
// }
