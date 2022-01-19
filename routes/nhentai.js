const { API } = require("nhentai-api");
const nhentai = new API();
const express = require("express");
const router = express.Router();

router.get("/random", async (req, res) => {
  nhentai
    .getRandomBook()
    .then((id) => id.id)
    .then((id) =>
      nhentai.getBook(id).then((book) => {
        const id = book.id
        const title = book.title;
        let langs = book.languages;
        langs = langs.map((lang) => lang.name);
        let tags = book.tags;
        tags = tags.filter((tag) => tag.type.type != "artist");
        tags = tags.map((tag) => tag.name);
        const pages = [];
        for(let i in Range(1, book.pages)){
            pages.push()
        }
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

        res.send(result);
      })
    );
});
router.get('/search', (req, res) => {
    nhentai.search(req.query.query, Number(req.query.page)).then(search => {
        res.send(search)
    })
})
module.exports = router;
