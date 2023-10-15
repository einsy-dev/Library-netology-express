const Book = require('../models/Book');


class AppController {
    async main(req, res) {

        try {
            const data = await Book.find().select('-__v');
            res.render('index', { type: 'view', data: data });
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = new AppController()