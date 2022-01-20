const { API } = require("nhentai-api");
const nhentai = new API();
const express = require("express");
const router = express.Router();


const bookHandler = (book) => {
  const title = book.title;
  const pages = book.pages.map((page) => "https://t.dogehls.xyz" + nhentai.getImageURL(page).slice(21));
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
  let lang = book.languages.toNames().join(", ");
  let tags = book.tags;
  tags = tags.filter(
    (tag) => tag.type.type != "artist" && tag.type.type != "language"
  );
  tags = tags.map((tag) => tag.name);
  const thumb = "https://t.dogehls.xyz" + nhentai.getImageURL(book.cover).slice(21);
  const artist = book.artists.toNames().join(", ");
  const result = {
    title,
    lang,
    tags,
    thumb,
    artist,
    id,
  };
  //"https://t.dogehls.xyz" + nhentai.getImageURL(book.cover).slice(21);
  return result;
};
router.get("/random", async (req, res) => {
  nhentai
    .getRandomBook()
    .then((id) => id.id)
    .then((id) => res.send(`${id}`));
});
router.get("/search", (req, res) => {
  req.query.query = req.query.query.split(' ').join('+')
  nhentai.search(`${req.query.query}`, Number(req.query.page)).then((search) => {
    let books = search.books.map((book) => searchBookHandler(book))
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
