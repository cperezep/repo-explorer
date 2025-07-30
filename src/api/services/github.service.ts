import type { ApiRepository, Repository } from '../../types';
import { mapApiRepositoryToRepository } from '../../utils';
import request from '../client/request';

export async function fetchRepositories(org: string): Promise<Array<Repository>> {
  const { data } = await request<Array<ApiRepository>>('GET', `orgs/${org}/repos`);
  if (!data) {
    throw new Error('Something went wrong!');
  }
  return data.map(mapApiRepositoryToRepository);
}
