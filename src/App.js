import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const client = new ApolloClient({
  // サンプル URL
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
  uri: 'http://localhost:4000',
});

const EXCHANGE_BOOKS = gql`
  {
    book(author: "hisasann") {
      title
      author
    }
  }
`;

function ExchangeBooks() {
  const { loading, error, data } = useQuery(EXCHANGE_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // 絞り込みの場合
  if (data.book) {
    const { title, author } = data.book;
    return (
      <div key={title}>
        <p>
          {title}: {author}
        </p>
      </div>
    );
  }

  // 全件の場合
  return data.books.map(({ title, author }) => (
    <div key={title}>
      <p>
        {title}: {author}
      </p>
    </div>
  ));
}

client
  .query({
    query: gql`
      {
        book(author: "hisasann") {
          title
          author
        }
      }
    `
  })
  .then(result => console.log(result));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>My first Apollo app <span role="img" aria-label="rocket"> 🚀</span></h2>
        <ExchangeBooks />
      </div>
    </ApolloProvider>
  );
};

export default App;
