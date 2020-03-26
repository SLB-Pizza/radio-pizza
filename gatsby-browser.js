import React from 'react';
// import GlobalContextProvider from './src/context/GlobalContextProvider';
import Layout from './src/components/Layout';

// export const wrapRootElement = ({ element }) => {
//   return <GlobalContextProvider>{element}</GlobalContextProvider>;
// };

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
