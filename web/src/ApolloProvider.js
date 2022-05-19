import React from 'react';
import { ApolloProvider } from "@apollo/client";
import { Provider } from 'react-redux'
import { createApolloClient } from './utils';
import App from './App'
import store from './redux/store'

const client = createApolloClient()
export default (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
)
