const Book = require('../models/Book');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const zip = require('express-zip');

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
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const files = req.files;

    if (!title || !description || !authors || !fileCover || !fileName || !files) {
        return res.status(400).send({ message: 'Please fill in all fields' });
    }

    try {
        const book = await new Book({ title, description, authors, favorite, fileCover, fileName });

        const dirPath = path.resolve(__dirname, '..', `public/images/${book._id}`);
        fs.mkdirSync(dirPath);

        const images = [];

        files.map(file => {
            const fileName = uuid.v4() + ".jpg";
            images.push(fileName);

            fs.writeFileSync(path.join(dirPath, fileName), file.buffer);
        });

        await book.set({ fileBook: images });
        await book.save();
        res.status(200).send({ message: 'Book created' });

    } catch (error) {
        console.error(error);
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

    async download(req, res) {
        const { id } = req.params;

        try {
            const book = await Book.findById(id);
            const files = book.fileBook.map(el => ({
                path: path.resolve(__dirname, '..', `public/images/${id}/${el}`),
                name: el
            }));

            res.set('Content-Type', 'application/zip');
            res.set('Content-Disposition', `attachment; filename=${id}.zip`);

            res.zip(files, `${id}.zip`, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Files sent successfully');
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new BookController()
