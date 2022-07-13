const { nanoid } = require('nanoid');
const books = require('./books');

// Add book
const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  books.push(newBook);

  // check book
  const isSuccess = books.filter((el) => el.id === id).length > 0;
  if (isSuccess) {
    if (readPage > pageCount) {
      const index = books.findIndex((el) => el.id === id);
      books.splice(index, 1);
      const response = h.response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    // finished
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  // handling general error
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// getAllBooks
const getAllBooks = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      books: books.map((el) => ({
        id: el.id,
        name: el.name,
        publisher: el.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// getByIdBook
const getByIdBook = (request, h) => {
  const { bookId } = request.params;
  const getbook = books.filter((el) => el.id === bookId)[0];
  if (getbook !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book: getbook,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// editByIdBook
const editByIdBook = (request, h) => {
  const { bookId } = request.params;
  let finished = false;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  if (readPage === pageCount) {
    finished = true;
  }
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((el) => el.id === bookId);
  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    updatedAt,
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

// deleteByIdBook
const deleteByIdBook = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((el) => el.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books.splice(index, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};

module.exports = {
  addBook,
  getAllBooks,
  getByIdBook,
  editByIdBook,
  deleteByIdBook,
};
