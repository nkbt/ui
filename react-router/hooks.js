import {useCallback, useContext} from 'react';
import {StateContext} from './StateContext';
import {DispatchContext} from './DispatchContext';
import {onNavigate} from './reducer';
import {ADD, NAVIGATE, REMOVE, RESTORE} from './constants';

export function useValue(key) {
  const router = useContext(StateContext);
  return router.query[key];
}

export function useSearch() {
  const router = useContext(StateContext);
  const {search} = router;
  return search;
}

export function useCleanSearch() {
  const router = useContext(StateContext);
  const {cleanSearch} = router;
  return cleanSearch;
}

export function useIsActive(query) {
  const router = useContext(StateContext);
  const {cleanSearch} = router;
  if (!query) {
    return false;
  }
  const {cleanSearch: nextCleanSearch} = onNavigate(router, {query});
  return cleanSearch === nextCleanSearch;
}

export function useCleanHref(query) {
  const router = useContext(StateContext);
  const {cleanSearch} = router;
  if (!query) {
    return cleanSearch;
  }
  const {cleanSearch: nextCleanSearch} = onNavigate(router, {query});
  return nextCleanSearch;
}

export function useHref(query) {
  const router = useContext(StateContext);
  const {search} = router;
  if (!query) {
    return search;
  }
  const {search: nextSearch} = onNavigate(router, {query});
  return nextSearch;
}

export function useNavigate() {
  const dispatch = useContext(DispatchContext);
  return useCallback(query => dispatch({type: NAVIGATE, query}), [dispatch]);
}

export function useAdd() {
  const dispatch = useContext(DispatchContext);
  return useCallback(params => dispatch({type: ADD, params}), [dispatch]);
}

export function useRemove() {
  const dispatch = useContext(DispatchContext);
  return useCallback(params => dispatch({type: REMOVE, params}), [dispatch]);
}

export function useRestore() {
  const dispatch = useContext(DispatchContext);
  return useCallback(query => dispatch({type: RESTORE, query}), [dispatch]);
}
