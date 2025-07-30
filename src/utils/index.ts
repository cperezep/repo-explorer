import type { ApiRepository, Repository } from '../types';

export function mapApiRepositoryToRepository(apiRepository: ApiRepository): Repository {
  return {
    id: apiRepository.id,
    title: apiRepository.name,
    description: apiRepository.description,
    language: apiRepository.language,
    forksCount: apiRepository.forks_count,
    openIssuesCount: apiRepository.open_issues_count,
    watchersCount: apiRepository.watchers_count,
    stargazersCount: apiRepository.stargazers_count,
    htmlUrl: apiRepository.html_url,
  };
}
