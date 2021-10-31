import {shallowEqualObjects} from '@nkbt/shallow-equal-objects';
import {sortedObject} from './sortedObject';
import {initialState} from './initialState';
import {queryToSearch, safeQuery} from './codec';
import {ADD, NAVIGATE, REMOVE, RESTORE} from './constants';

export function isEqualState(stateA, stateB) {
  return shallowEqualObjects(stateA.query, stateB.query) && shallowEqualObjects(stateA.params, stateB.params);
}

export function cleanupQuery(query, params) {
  return Object.keys(query).reduce(
    (clean, key) => (key in params && query[key] === params[key] ? clean : Object.assign(clean, {[key]: query[key]})),
    {}
  );
}
export function recalculate(state) {
  const newQuery = safeQuery(sortedObject({...state.params, ...state.query}));
  const newState = shallowEqualObjects(state.query, newQuery) ? state : {...state, query: newQuery};

  const search = queryToSearch(newQuery);
  const cleanQuery = cleanupQuery(newQuery, state.params);
  const cleanSearch = queryToSearch(cleanQuery);
  return Object.assign(newState, {search, cleanQuery, cleanSearch});
}

export function onRestore(state, {query}) {
  const newQuery = {...query};
  if (shallowEqualObjects(state.query, newQuery)) {
    return state;
  }
  return recalculate({...state, query: newQuery});
}

export function onNavigate(state, {query}) {
  const newQuery = {...state.query, ...query};
  if (shallowEqualObjects(state.query, newQuery)) {
    return state;
  }
  return recalculate({...state, query: newQuery});
}

export function onAdd(state, {params}) {
  const newParams = {...state.params, ...params};
  if (shallowEqualObjects(state.params, newParams)) {
    return state;
  }
  return recalculate({...state, params: newParams});
}

export function onRemove(state, {params}) {
  const newQuery = {...state.query};
  const newParams = {...state.params};
  Object.keys(params).forEach(param => {
    if (param in newQuery) {
      delete newQuery[param];
    }
    if (param in newParams) {
      delete newParams[param];
    }
  });
  Object.assign(state, {query: newQuery, params: newParams});
  return recalculate(state);
}

export function reduce(state, action) {
  const mapping = {
    [RESTORE]: onRestore,
    [NAVIGATE]: onNavigate,
    [ADD]: onAdd,
    [REMOVE]: onRemove
  };
  return action.type in mapping ? mapping[action.type](state, action) : state;
}

export function reducer(state = initialState, {type, ...payload}) {
  const newState = reduce(state, {type, ...payload});
  return isEqualState(state, newState) ? state : newState;
}
