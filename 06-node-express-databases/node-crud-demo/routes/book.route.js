const express = require("Express");
const router = express.Router();

const Book = require("../models/Book.model");

router.get("/books", (req, res) => {
  Book.find({})
    .then((books) =>
      res.render("books-list", { books })
    )
    .catch((error) => `Error while fetching all books: ${error}`);
});

router.get("/books/create", (req, res) => res.render("books-create"));

router.post("/books/create", (req, res) => {
  const { title, author, description, rating } = req.body;

  Book.create({ title, author, description, rating })
    .then(() => res.redirect("/"))
    .catch((error) => `Error while creating a new book: ${error}`);
});

router.get("/books/:id", (req, res) => {
  const { id } = req.params;

  Book.findById(id)
    .then((foundBook) => res.render("books-details", foundBook))
    .catch((error) => `Error while creating a new book: ${error}`);
});

router.get("/books/:id/edit", (req, res) => {
  const { id } = req.params;

  Book.findById(id)
    .then((bookToEdit) => {
      res.render("books-edit", bookToEdit);
    })
    .catch((error) => `Error while getting a single book for edit: ${error}`);
});

router.post("/books/:id/edit", (req, res) => {
  const { id } = req.params;
  const { title, description, author, rating } = req.body;

  Book.findByIdAndUpdate(
    id,
    { title, description, author, rating },
    { new: true }
  )
    .then((updatedBook) => res.redirect(`/${updatedBook._id}`))
    .catch((error) =>
      console.log(`Error while updating a single book: ${error}`)
    );
});

router.post("/books/:id/delete", (req, res) => {
  const { id } = req.params;

  Book.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(`Error while deleting a book: ${error}`));
});

module.exports = router;
