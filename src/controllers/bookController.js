const Book = require('../models/Book')

class BookController {
    async getAll(_, res) {
        try {
            const data = await Book.find();
            res.status(200).send(data);
        } catch (error) {
            console.log(error)
        }
    }
    async getById(req, res) {
        const { id } = req.params
        try {
            const data = await Book.findById(id);
            res.status(200).send(data);
        } catch (error) {
            console.log(error)
        }
    }
    async create(req, res) {
        const { title, description, authors, favorite, fileCover, fileName } = req.body
        try {
            const data = await new Book({ title, description, authors, favorite, fileCover, fileName });
            data.save();
            res.status(200).send({ message: 'Book created' });
        } catch (error) {
            console.log(error)
        }
    }
    async update(req, res) {
        const { id } = req.params
        const { title, description, authors, favorite, fileCover, fileName } = req.body
        try {
            await Book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName });
            res.status(200).send({ message: 'Book updated' });
        } catch (error) {
            console.log(error)
        }
    }
    async delete(req, res) {
        const { id } = req.params
        try {
            await Book.findByIdAndDelete(id);
            res.status(200).send({ message: 'Book deleted' });
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = new BookController() 