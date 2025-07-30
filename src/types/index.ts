export type Repository = {
  id: number;
  title: string;
  description?: string | null;
  language?: string | null;
  forksCount: number;
  openIssuesCount: number;
  watchersCount: number;
  stargazersCount: number;
  htmlUrl: string;
};

export type ApiRepository = {
  id: number;
  name: string;
  description?: string | null;
  language?: string | null;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  stargazers_count: number;
  html_url: string;
};
