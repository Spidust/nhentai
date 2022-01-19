const { API } = require("nhentai-api");
const nhentai = new API();
const express = require("express");
const router = express.Router();

const bookHandler = (book) => {
  const id = book.id;
  const title = book.title;
  let langs = book.languages;
  langs = langs.map((lang) => lang.name);
  let tags = book.tags;
  tags = tags.filter((tag) => tag.type.type != "artist");
  tags = tags.map((tag) => tag.name);
  const pages = book.pages.map((page) => nhentai.getImageURL(page));
  let artist = book.artists;
  artist = artist.map((tag) => tag.name);
  const result = {
    title,
    langs,
    tags,
    pages,
    artist,
    id,
  };
  return result;
};
const searchBookHandler = (book) => {
    const id = book.id;
    const title = book.title;
    let langs = book.languages;
    langs = langs.map((lang) => lang.name);
    let tags = book.tags;
    tags = tags.filter((tag) => tag.type.type != "artist");
    tags = tags.map((tag) => tag.name);
    const thumb = nhentai.getImageURL(book.cover)
    let artist = book.artists;
    artist = artist.map((tag) => tag.name);
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
    .then((id) =>
      nhentai.getBook(id).then((book) => {
        const result = bookHandler(book);

        res.send(result);
      })
    );
});
router.get("/search", (req, res) => {
  nhentai.search(req.query.query, Number(req.query.page)).then((search) => {
    let books = search.books.map((book) => searchBookHandler(book));
    let result = {
        maxPage: search.pages,
        query: search.query,
        books
    }
    res.send(result);
  });
});
module.exports = router;
