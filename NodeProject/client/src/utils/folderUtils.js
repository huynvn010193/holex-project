import { graphQLRequest } from "./request";

export const folderLoader = async () => {
  const query = `query Folders {
      folders {
        id,
        name,
        createAt
      }
    }`;

  const data = await graphQLRequest({ query });

  return data;
};
