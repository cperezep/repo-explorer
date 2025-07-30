export type Repository = {
  id: string;
  title: string;
  description: string;
  language: string;
  forksCount: number;
  openIssuesCount: number;
  watchersCount: number;
};

export type ApiRepository = {
  id: string;
  name: string;
  description: string;
  language: string;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
};
