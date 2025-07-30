import type { ApiRepository, Repository } from '../types';

export const mockApiRepository: ApiRepository = {
  id: 123456789,
  name: 'awesome-react-app',
  description: 'A comprehensive React application with TypeScript and modern tooling',
  language: 'TypeScript',
  forks_count: 45,
  open_issues_count: 12,
  watchers_count: 78,
  stargazers_count: 234,
  html_url: 'https://github.com/octocat/awesome-react-app',
};

export const mockApiRepositoryMinimal: ApiRepository = {
  id: 987654321,
  name: 'simple-utility',
  description: null,
  language: null,
  forks_count: 0,
  open_issues_count: 0,
  watchers_count: 1,
  stargazers_count: 3,
  html_url: 'https://github.com/developer/simple-utility',
};

export const mockRepository: Repository = {
  id: 123456789,
  title: 'awesome-react-app',
  description: 'A comprehensive React application with TypeScript and modern tooling',
  language: 'TypeScript',
  forksCount: 45,
  openIssuesCount: 12,
  watchersCount: 78,
  stargazersCount: 234,
  htmlUrl: 'https://github.com/octocat/awesome-react-app',
};

export const mockRepositoryMinimal: Repository = {
  id: 987654321,
  title: 'simple-utility',
  description: null,
  language: null,
  forksCount: 0,
  openIssuesCount: 0,
  watchersCount: 1,
  stargazersCount: 3,
  htmlUrl: 'https://github.com/developer/simple-utility',
};

export const mockApiRepositoryPairs = [
  { api: mockApiRepository, mapped: mockRepository },
  { api: mockApiRepositoryMinimal, mapped: mockRepositoryMinimal },
];
