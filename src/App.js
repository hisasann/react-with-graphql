import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const client = new ApolloClient({
  // サンプル URL
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
  uri: 'http://localhost:4000',
});

const EXCHANGE_BOOKS = gql`
  {
    books {
      title
      author
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;

let booksRefetch;
function ExchangeBooks() {
  const { loading, error, data, refetch } = useQuery(EXCHANGE_BOOKS, {
  });
  booksRefetch = refetch;

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

function AddBook() {
  let title, author;
  const [addBook, { data }] = useMutation(ADD_BOOK);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addBook({ variables: { title: title.value, author: author.value } });
          title.value = '';
          author.value = '';
          booksRefetch();
        }}
      >
        <p>
          title: <input
            ref={node => {
              title = node;
            }}
          />
        </p>
        <p>
          author: <input
            ref={node => {
              author = node;
            }}
          />
        </p>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

client
  .query({
    query: gql`
      {
        books {
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
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;

