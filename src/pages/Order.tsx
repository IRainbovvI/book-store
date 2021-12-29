import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { useAppSelector } from '../hooks';

const Order = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    postalCode: ''
  });
  const [errFirstName, setErrFirstName] = useState('');
  const [errLastName, setErrLastName] = useState('');
  const [errCity, setErrCity] = useState('');
  const [errPostalCode, setErrPostalCode] = useState('');
  const books = useAppSelector((state) => state.cart);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrFirstName('');
    setErrLastName('');
    setErrCity('');
    setErrPostalCode('');
    if (validation()) {
      const newArr = Array.from(books, (item) => {
        return { id: item.book.id, quantity: item.quantity };
      });

      axios
        .post('http://localhost:3001/api/order', {
          order: newArr,
          first_name: formData.firstName,
          last_name: formData.lastName,
          city: formData.city,
          zip_code: formData.postalCode
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validation = (): boolean => {
    if (formData.firstName.length === 0) {
      setErrFirstName('First name is required');
      return false;
    } else if (formData.firstName.length < 4) {
      setErrFirstName('First name is too short');
      return false;
    } else if (formData.firstName.length > 50) {
      setErrFirstName('First name is too long');
      return false;
    }

    if (formData.lastName.length === 0) {
      setErrLastName('Last name is required');
      return false;
    } else if (formData.lastName.length < 5) {
      setErrLastName('Last name is too short');
      return false;
    } else if (formData.lastName.length > 50) {
      setErrLastName('Last name is too long');
      return false;
    }

    if (formData.city.length === 0) {
      setErrCity('City is required');
      return false;
    }

    if (formData.postalCode.length === 0) {
      setErrPostalCode('Postal code is required');
      return false;
    }

    if (!/\d{2}[-]\d{3}/.test(formData.postalCode)) {
      setErrPostalCode('Postal code must match a pattern: 00-000');
      return false;
    }

    return true;
  };

  return (
    <div className='container mt-5'>
      <form
        className='row'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className=' offset-2 col-4'>
          <label htmlFor='firstName' className='form-label'>
            First Name
          </label>
          <input
            type='text'
            id='firstName'
            className='form-control'
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <div className='error text-danger'>{errFirstName}</div>
        </div>
        <div className='col-4'>
          <label htmlFor='lasttName' className='form-label'>
            Last Name
          </label>
          <input
            type='text'
            id='lastName'
            className='form-control'
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <div className='error text-danger'>{errLastName}</div>
        </div>
        <div className=' offset-2 col-4'>
          <label htmlFor='city' className='form-label'>
            City
          </label>
          <input
            type='text'
            id='city'
            className='form-control'
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <div className='error text-danger'>{errCity}</div>
        </div>
        <div className='col-4'>
          <label htmlFor='postalCode' className='form-label'>
            Postal Code
          </label>
          <input
            type='text'
            id='postalCode'
            className='form-control'
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
          />
          <div className='error text-danger'>{errPostalCode}</div>
        </div>
        <div className='offset-2 col-8 mt-2'>
          <button type='submit' className='btn btn-primary w-100'>
            Order and Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default Order;
