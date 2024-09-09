export const setQueryParams = (searchParams: URLSearchParams, params: Record<string, string|number>) => {
  const newSearchParams = new URLSearchParams(searchParams);
  Object.entries(params).forEach(([key, value]) => {
    newSearchParams.set(key, value.toString());
  });
  return newSearchParams.toString();
};
