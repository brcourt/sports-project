import { Breadcrumbs, Container } from "@mantine/core";
import { Link } from "react-router-dom";

type CrumbsProps = { title: string; href: string }[];

export function Crumbs({ links }: { links?: CrumbsProps }) {
  const items = links?.map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <Container fluid mb="md">
      <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
        <Link to="/" key="home">
          Overview
        </Link>
        {items}
      </Breadcrumbs>
    </Container>
  );
}
