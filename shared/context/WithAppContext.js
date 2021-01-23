import React from 'react';
import {Consumer} from './AppContext';
export default function WithAppContext(Component) {
  return function WrapperComponent(props) {
    return (
      <Consumer>
        {state => {
          return <Component {...props} context={state} />;
        }}
      </Consumer>
    );
  };
}
