import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const Cart = () => {
  const booksCart = useAppSelector((state) => state.cart);

  if (booksCart.length) {
    return (
      <div className='container mt-5 d-flex flex-column'>
        <div className='card'>
          <ul className='list-group'>
            {booksCart.map((book) => {
              return (
                <li key={book.book.id} className='list-group-item d-flex'>
                  <div className='me-auto'>{book.book.title}</div>
                  <div>{book.quantity}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <Link to='/order' className='btn btn-primary text-center mt-3'>
          Next
        </Link>
      </div>
    );
  } else {
    return (
      <div className='container mt-5 text-center fs-3'>
        Your cart is currently empty.
      </div>
    );
  }
};

export default Cart;
