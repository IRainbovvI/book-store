import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookCart } from '../interfaces';

const initialState: Array<BookCart> = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToTheCart: (state, action: PayloadAction<Book>) => {
      const bookId = state.findIndex(
        (item) => item.book.id === action.payload.id
      );
      if (bookId !== -1) {
        state[bookId].quantity += 1;
        return state;
      }
      return [...state, { book: action.payload, quantity: 1 }];
    }
  }
});

export const { addToTheCart } = cartSlice.actions;

export default cartSlice.reducer;
