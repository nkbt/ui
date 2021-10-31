import {parse, stringify} from 'qs';

export function safeQuery(query = {}) {
  const newQuery = query === null ? {} : query;

  Object.keys(newQuery).forEach(key => {
    newQuery[key] = `${newQuery[key]}`;
  });

  return newQuery;
}

export function queryToSearch(query) {
  const search = stringify(query, {strictNullHandling: true});

  return search.length > 0 ? `?${search}` : '';
}

export function searchToQuery(search) {
  return safeQuery(parse(search.substr(1), {strictNullHandling: true}));
}
