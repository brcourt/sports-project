import {
  IconLock,
  IconMessage2,
  IconUser,
  IconDatabase,
  IconChartBar,
  IconCash,
} from "@tabler/icons-react";
import { Container, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core";
import classes from "./Features.module.css";

export const MOCKDATA = [
  {
    icon: IconMessage2,
    title: "CDK",
    description:
      "The backend is built using the AWS CDK, including the database, API, compute, and auth.",
  },
  {
    icon: IconUser,
    title: "Serverless",
    description:
      "The backend of this demo runs completely serverlessly, using DynamoDB, AWS Lambda, and API Gateway. The website is hosted on S3.",
  },
  {
    icon: IconCash,
    title: "Tanstack Query",
    description:
      "Queries are cached for 5 minutes using Tanstack Query, so you can get the same data without hitting the database repeatedly. ",
  },
  {
    icon: IconChartBar,
    title: "Mantine Charts",
    description:
      "I decided to use Mantine for hte UI framework. It has a budding charting library, and I wanted to see how it compared to Chart.js.",
  },
  {
    icon: IconDatabase,
    title: "ElectroDB",
    description:
      "The backend database utilizes a single-table design. To facilitate the schema, this demo uses ElectroDB.",
  },
  {
    icon: IconLock,
    title: "Authentication",
    description:
      "Authentication is built on top of Amazon Cognito. I am also using their hosted auth page, just to speed things along.",
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={18} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function FeaturesGrid() {
  const features = MOCKDATA.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>
        Integrate effortlessly with any technology stack
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Every once in a while, you’ll see a Golbat that’s missing some fangs.
          This happens when hunger drives it to try biting a Steel-type Pokémon.
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: "xl", md: 50 }}
        verticalSpacing={{ base: "xl", md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
