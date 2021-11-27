export function safeQuery(query = {}) {
  const newQuery = query === null ? {} : query;

  Object.keys(newQuery).forEach(key => {
    newQuery[key] = `${newQuery[key]}`;
  });

  return newQuery;
}

export function queryToSearch(query) {
  const params = new URLSearchParams(Object.entries(query));
  params.sort();
  const search = params.toString();
  return search.length > 0 ? `?${search}` : '';
}

export function searchToQuery(search) {
  return safeQuery(Object.fromEntries(new URLSearchParams(search.substr(1))));
}
