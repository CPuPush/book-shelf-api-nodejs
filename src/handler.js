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
    let finished = false;
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
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }

        // finished
        const index = books.findIndex((el) => el.id === id);
        finished = true;
        if (index !== 1) {
            books[index] = {
                ...books[index],
                finished,
            };
        }
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
const getAllBooks = () => ({
    status: 'success',
    data: {
        books,
    },
});

module.exports = { addBook, getAllBooks };
