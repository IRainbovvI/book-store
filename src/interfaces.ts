export interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  pages: number;
  price: number;
  currency: string;
}

export interface BookCart {
  book: Book;
  quantity: number;
}
