import { Box, Paper } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
];

export function ExampleCarousel() {
  const slides = images.map((url) => (
    <Carousel.Slide key={url} h="250px">
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        style={{ backgroundImage: `url(${url})` }}
        h="250px"
      />
    </Carousel.Slide>
  ));
  return (
    <Box h={250}>
      <Carousel
        withIndicators
        height={250}
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
      >
        {slides}
      </Carousel>
    </Box>
  );
}
