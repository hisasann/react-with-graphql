import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;

const AddBook = () => {
  let title, author;
  const [addBook, { error, data }] = useMutation(ADD_BOOK, {
    refetchQueries: ['getBooks']
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addBook({ variables: { title: title.value, author: author.value } });
          title.value = '';
          author.value = '';
        }}
      >
        <p>
          title:{' '}
          <input
            ref={node => {
              title = node;
            }}
          />
        </p>
        <p>
          author:{' '}
          <input
            ref={node => {
              author = node;
            }}
          />
        </p>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
