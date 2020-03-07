import React, { useEffect } from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import AddBook from "./AddBook";
import ExchangeBooks, { EXCHANGE_BOOKS } from "./ExchangeBooks";

const client = new ApolloClient({
  // サンプル URL
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
  uri: 'http://localhost:4000',
});

const App = () => {
  // didUpdate
  useEffect(() => {
    console.log('ready');
    // client.query({ query: EXCHANGE_BOOKS }).then(result => console.log(result));
    return () => {};
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>
          My first Apollo app{' '}
          <span role="img" aria-label="rocket">
            {' '}
            🚀
          </span>
        </h2>
        <ExchangeBooks />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;
