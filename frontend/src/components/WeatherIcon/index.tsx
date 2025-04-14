import {
  IconSun,
  IconCloudRain,
  IconCloud,
  IconCloudFog,
  IconCloudSnow,
  IconCloudStorm,
  IconSunWind,
} from "@tabler/icons-react";

export function GetWeatherIcon({ weather }: { weather: string }) {
  switch (weather) {
    case "Sunny":
      return <IconSun color={"var(--mantine-color-yellow-8)"} />;
    case "Rainy":
      return <IconCloudRain />;
    case "Snowy":
      return <IconCloudSnow />;
    case "Windy":
      return <IconSunWind />;
    case "Foggy":
      return <IconCloudFog />;
    case "Thunderstorm":
      return <IconCloudStorm />;
    case "Partly Cloudy":
      return <IconCloud />;
    case "Cloudy":
      return <IconCloud />;
    default:
      return "";
  }
}
