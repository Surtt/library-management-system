import React, { useState } from 'react';

import Books from '@/components/books';
import Filter from '@/components/filter';
import { useAuthors } from '@/queries/useAuthors';
import { useBooks } from '@/queries/useBooks';
import { IBookFilter } from '@/types';

const HomePage = () => {
  const [filters, setFilters] = useState<IBookFilter>({
    available: false,
    author: '',
    publishedDate: '',
  });
  const [books = [], errorBooks] = useBooks({ filters });
  const [authors] = useAuthors();
  return (
    <>
      <Filter filters={filters} setFilter={setFilters} authors={authors} />
      <Books filters={filters} books={books} errorBooks={errorBooks} />
    </>
  );
};

export default HomePage;
