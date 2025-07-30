import type { ApiRepository, Repository } from '../../types';
import { mapApiRepositoryToRepository } from '../../utils';
import request from '../client/request';

const DEFAULT_ORG = 'godaddy';

export async function fetchRepositories(org: string = DEFAULT_ORG): Promise<Array<Repository>> {
  const { data } = await request<Array<ApiRepository>>('GET', `orgs/${org}/repos`);
  if (!data) {
    throw new Error('Something went wrong!');
  }

  return data.map(mapApiRepositoryToRepository);
}

export async function fetchRepository(repo: string, owner: string = DEFAULT_ORG): Promise<Repository> {
  const { data } = await request<ApiRepository>('GET', `repos/${owner}/${repo}`);
  if (!data) {
    throw new Error('Repository not found!');
  }

  return mapApiRepositoryToRepository(data);
}
