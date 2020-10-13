// url for the podcast
let url='https://anchor.fm/s/1ef35bb0/podcast/rss';


async function fetchData (url) {
    const response = await fetch(url);
    const str = await response.text();
    const data = (new window.DOMParser()).parseFromString(str, "text/xml");
    return [...data.getElementsByTagName('item')].map((item, index) => {
        return {
            'title': item.getElementsByTagName('title')[0].textContent,
            'file': item.getElementsByTagName('enclosure')[0].getAttribute('url'),
        };
    });
}

let tracks = [];

// fetchData and init it to audio player object from player.js
let p = Promise.resolve(fetchData(url));
p.then(items => {
    tracks = items;
    // console.log(tracks);
    AP.init({
        playList: tracks
    });
})
