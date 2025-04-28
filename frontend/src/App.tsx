import { lazy, Suspense, useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./themes";
import { Layout } from "./components/Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewRoute from "./routes/Overview";
import GamesRoute from "./routes/Games";
import PlayersRoute from "./routes/Players";
import TeamsRoute from "./routes/Teams";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Authenticator } from "@aws-amplify/ui-react";
import LoginComponent from "./views/Auth/Login";
import SingleGameRoute from "./routes/Games/singeGameRoute";
import SinglePlayerRoute from "./routes/Players/singePlayerRoute";
import SingleTeamRoute from "./routes/Teams/singeTeamRoute";

import "@mantine/core/styles.css";
import "./themes/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
    },
  },
});

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

export default function App() {
  const [showDevtools, setShowDevtools] = useState(true);

  useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen />
        {showDevtools && (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        )}
        <BrowserRouter>
          <Authenticator signUpAttributes={["family_name"]}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<OverviewRoute />} />
                <Route path="games" element={<GamesRoute />} />
                <Route path="teams" element={<TeamsRoute />} />
                <Route path="players" element={<PlayersRoute />} />
                <Route path="games/:gameId" element={<SingleGameRoute />} />
                <Route path="teams/:teamId" element={<SingleTeamRoute />} />
                <Route
                  path="players/:playerId"
                  element={<SinglePlayerRoute />}
                />
              </Route>
              <Route path="/login" element={<LoginComponent />} />
            </Routes>
          </Authenticator>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}
