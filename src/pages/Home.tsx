import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SingleBook from '../components/SingleBook';
import { Book } from '../interfaces';

const Home = () => {
  const [books, setBooks] = useState<Array<Book>>([]);
  const [lastPage, setLastPage] = useState<number>(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/book').then((res) => {
      setLastPage(
        Math.ceil(
          res.data['metadata']['total_records'] /
            res.data['metadata']['records_per_page']
        )
      );
    });
  }, []);

  useEffect(() => {
    for (let i = 1; i <= lastPage; i++) {
      axios.get('http://localhost:3001/api/book?page=' + i).then((res) => {
        setBooks((prevBooks) => prevBooks.concat(res.data['data']));
      });
    }
  }, [lastPage]);

  return (
    <main className='container'>
      <div className='row mt-5'>
        <div className='col text-center  fs-2 fw-bold'>Available books</div>
      </div>
      <div className='row mt-5 g-5 justify-content-center'>
        {books.map((book) => {
          return (
            <div key={book.id} className='col-10 col-md-6 col-lg-3'>
              <SingleBook book={book} />
            </div>
          );
        })}
      </div>
      <div className='row mt-5'></div>
    </main>
  );
};

export default Home;
