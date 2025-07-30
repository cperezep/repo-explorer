import { useQuery } from '@tanstack/react-query';
import { fetchRepositories } from '../../api/services/github.service';

export const useRepositories = () => {
  return useQuery({
    queryKey: ['repositories'],
    queryFn: () => fetchRepositories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
