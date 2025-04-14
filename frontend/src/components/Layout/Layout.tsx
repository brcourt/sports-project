import { AppShell, Container } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import classes from "./Layout.module.css";
import { Footer } from "../Footer";

export function Layout() {
  /** Implement Authentication Here */
  // const AppLayout = useMemo(() => {
  //   if (authenticated) {
  //    return  layouts[layoutType]
  //   }
  //   return lazy(() => import('./AuthLayout'))
  // }, [authenticated])

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main className={classes.main}>
        <Container fluid h="100%">
          <Outlet />
        </Container>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
