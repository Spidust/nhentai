const { API } = require("nhentai-api");
const nhentai = new API();
const express = require("express");
const router = express.Router();

const bookHandler = (book) => {
  const title = book.title;
  const pages = book.pages.map((page) => nhentai.getImageURL(page));
  const artist = book.artists.toNames().join(", ");
  const result = {
    title,
    pages,
    artist,
  };
  return result;
};
const searchBookHandler = (book) => {
  const id = book.id;
  const title = book.title;
  let langs = book.languages;
  langs = langs.map((lang) => lang.name);
  let tags = book.tags;
  tags = tags.filter(
    (tag) => tag.type.type != "artist" && tag.type.type != "language"
  );
  tags = tags.map((tag) => tag.name);
  const thumb = nhentai.getImageURL(book.cover);
  const artist = book.artists.toNames().join(", ");
  const result = {
    title,
    langs,
    tags,
    thumb,
    artist,
    id,
  };
  return result;
};
router.get("/random", async (req, res) => {
  nhentai
    .getRandomBook()
    .then((id) => id.id)
    .then((id) => res.send(`${id}`));
});
router.get("/search", (req, res) => {
  nhentai.search(req.query.query, Number(req.query.page)).then((search) => {
    let books = search.books.map((book) => searchBookHandler(book));
    let result = {
      maxPage: search.pages,
      query: search.query,
      books,
    };
    res.send(result);
  });
});

router.get("/read/:id", (req, res) => {
  nhentai
    .getBook(req.params.id)
    .then((book) => res.send(bookHandler(book)))
    .catch(() => res.status(404));
});
router.get("/mini/:id", (req, res) => {
  nhentai
    .getBook(req.params.id)
    .then((book) => res.send(searchBookHandler(book)))
    .catch(() => res.status(404));
});
module.exports = router;
