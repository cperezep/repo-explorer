import { useQuery } from '@tanstack/react-query';
import { fetchRepositories } from '../../api/services/github.service';

const DEFAULT_ORG = 'godaddy';

export const useRepositories = (org: string = DEFAULT_ORG) => {
  return useQuery({
    queryKey: ['repositories', org],
    queryFn: () => fetchRepositories(org),
    enabled: org.trim().length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
