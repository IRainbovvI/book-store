import React from 'react';
import { BsCartPlusFill } from 'react-icons/bs/index';
import { useAppDispatch } from '../hooks';
import { Book } from '../interfaces';
import { addToTheCart } from '../store/cartSlice';

interface BookProps {
  book: Book;
}

const SingleBook = ({ book }: BookProps) => {
  const { cover_url, title, author, pages, price, currency } = book;
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(addToTheCart(book));
  };

  return (
    <div className='card h-100 border-primary'>
      <img className='card-img-top h-50' src={cover_url} alt='book title' />
      <div className='card-body text-center d-flex flex-column'>
        <h4 className='card-title'>{title}</h4>
        <h6 className='card-subtitle text-muted'>{author}</h6>
        <p className='mt-2 page-count-custom'>{pages} Pages</p>
        <p className='fw-bold'>
          {price} {currency}
        </p>
        <div className='card-footer mt-auto'>
          <button className='btn btn-light' onClick={clickHandler}>
            <BsCartPlusFill size={30} className='text-primary' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
