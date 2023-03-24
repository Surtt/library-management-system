import { QueryFunction } from '@tanstack/query-core/build/lib/types';
import { QueryKey, useQuery } from '@tanstack/react-query';

const UseData = <T>(
  queryKeys: QueryKey,
  getData: QueryFunction<T>,
): [T | never[], unknown, boolean, boolean, boolean] => {
  const {
    data = [],
    error,
    isLoading,
    isFetching,
    isError,
  } = useQuery<T>({ queryKey: [queryKeys], queryFn: getData });

  return [data, error, isLoading, isFetching, isError];
};

export default UseData;
