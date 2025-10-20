class BookDto {
  id;
  name;
  author;
  genre;
  price;
  publisher;

  constructor(book) {
    // The 'book' parameter is the Mongoose model object from the database
    this.id = book._id; // We map the internal '_id' to a public 'id'
    this.name = book.name;
    this.author = book.author;
    this.genre = book.genre;
    this.price = book.price;
    this.publisher = book.publisher;
  }
}

module.exports = BookDto;
