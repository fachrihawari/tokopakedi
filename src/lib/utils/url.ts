export const setQueryParams = (params: Record<string, string|number>, searchParams?: URLSearchParams) => {
  const newSearchParams = new URLSearchParams(searchParams);
  Object.entries(params).forEach(([key, value]) => {
    newSearchParams.set(key, value.toString());
  });
  return newSearchParams
};

export const buildSearchParams = (url?: string | null) => {
  const searchParams = url ? new URL(url).searchParams : new URLSearchParams();
  return searchParams
}
