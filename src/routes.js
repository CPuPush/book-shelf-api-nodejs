const {
  addBook,
  getAllBooks,
  getByIdBook,
  editByIdBook,
  deleteByIdBook,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getByIdBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editByIdBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteByIdBook,
  },
];

module.exports = routes;
