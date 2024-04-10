export const LIBRARY_STORAGE_KEY = 'library';

export type Library = {
  area: { [areaId: string]: { name: string } };
  issue: {
    [issueId: string]: {
      name: string;
      pdfs: { [areaId: string]: string };
    };
  };
};
