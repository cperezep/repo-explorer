import { useQuery } from '@tanstack/react-query';
import { fetchRepository } from '../../api/services/github.service';

export const useRepository = (repo: string) => {
  return useQuery({
    queryKey: ['repository', repo],
    queryFn: () => fetchRepository(repo),
    enabled: Boolean(repo),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
