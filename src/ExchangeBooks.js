import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const EXCHANGE_BOOKS = gql`
  query getBooks {
    books {
      title
      author
    }
  }
`;

const ExchangeBooks = () => {
  const { loading, error, data, refetch } = useQuery(EXCHANGE_BOOKS, {});

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
};

export default ExchangeBooks;
