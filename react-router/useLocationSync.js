import {useContext, useEffect, useRef} from 'react';
import {createBrowserHistory} from 'history';
import {searchToQuery} from './codec';
import {recalculate} from './reducer';
import {useRestore} from './hooks';
import {StateContext} from './StateContext';

export function useLocationSync({debounceTimeout = 50} = {}) {
  const restore = useRestore();
  const router = useContext(StateContext);

  const {params, cleanSearch} = router;

  const historyRef = useRef(createBrowserHistory());

  // State -> URL
  useEffect(() => {
    let timer = setTimeout(() => {
      if (timer === null) {
        return;
      }
      timer = null;
      if (cleanSearch !== document.location.search) {
        const {pathname} = document.location;
        historyRef.current.push({pathname, search: cleanSearch});
      }
    }, debounceTimeout);

    return () => {
      clearTimeout(timer);
      timer = null;
    };
  }, [cleanSearch, debounceTimeout]);

  // URL -> State
  useEffect(() => {
    let didUnsubscribe = false;
    const unsubscribe = historyRef.current.listen(history => {
      if (didUnsubscribe) {
        return;
      }
      const {query: nextQuery, cleanSearch: nextCleanSearch} = recalculate({
        params,
        query: searchToQuery(history.location.search)
      });

      if (cleanSearch !== nextCleanSearch) {
        restore(nextQuery);
      }
    });

    return () => {
      didUnsubscribe = true;
      unsubscribe();
    };
  }, [cleanSearch, params, restore]);
}
