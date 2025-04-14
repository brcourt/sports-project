import { fetchAuthSession } from "aws-amplify/auth";
import axios, { type AxiosRequestConfig } from "axios";

// export const endpoint = "https://api.sports.courtney.cloud";
export const endpoint =
  "https://7h9n7d1atl.execute-api.us-east-1.amazonaws.com";

export const API = async ({
  url,
  config,
}: {
  url: string;
  config?: AxiosRequestConfig;
}) => {
  try {
    const response = await axios({
      method: "get",
      baseURL: endpoint,
      url,
      headers: {
        Authorization: `Bearer ${
          (await fetchAuthSession()).tokens?.accessToken || ""
        }`,
      },
      ...config,
    });
    return response.data;
  } catch (error) {
    throw Error(error as string);
  }
};
