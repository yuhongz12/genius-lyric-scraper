const Express = require('express');
const Genius = require("genius-lyrics");
const Client = new Genius.Client('FYpBpehTjRGU-tl2FnHN4eepKxIP6h0O_iy-9-umsxOBJOFt8C_kZ9Dp0xSujS_V');
const cors = require('cors');
const axios = require("axios");
const app = Express();

app.use(cors());


app.get('/', (req, res) => {
    res.send("Welcome to Genius Lyric Scraper")
})
app.get('/search', async (req, res) => {
    const query = req.query.q;
    const searches = await Client.songs.search(query);
    console.log(searches);
    const rawSong = searches.map((s) => ( {
        artist_names : s._raw.artist_names,
        song_art_image_thumbnail_url : s._raw.song_art_image_thumbnail_url,
        song_art_image_url : s._raw.song_art_image_url,
        id : s._raw.id,
        language : s._raw.language,
        title : s._raw.title,
        url: s._raw.url
    }));

    console.log(rawSong);
    res.send(rawSong);



})

app.get('/lyric', async (req, res) => {
    const songID = req.query.id;
    const song = await Client.songs.get(Number(songID));
    const lyrics = await song.lyrics();
    console.log(lyrics);
    res.send(lyrics);
})

app.listen( env.process.PORT || 4000);

