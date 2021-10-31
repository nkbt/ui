import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import {DispatchContext} from './DispatchContext';
import {reducer, recalculate} from './reducer';
import {searchToQuery} from './codec';
import {StateContext} from './StateContext';

export function Router({params, query, search, init, children}) {
  const [state, dispatch] = useReducer(
    reducer,
    recalculate({
      params,
      query: {...query, ...searchToQuery(search)}
    }),
    init
  );
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}
Router.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  params: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  query: PropTypes.object,
  search: PropTypes.string,
  init: PropTypes.func,
  children: PropTypes.node.isRequired
};
Router.defaultProps = {
  params: {},
  query: {},
  search: '?',
  init: undefined
};
