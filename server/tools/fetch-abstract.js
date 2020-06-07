const cheerio = require('cheerio');
const request = require('request');


const getBookAbstract = (url) => {
    request({
        method: 'GET',
        url
    }, (err, res, body) => {
            if (err) return console.error(err);

            console.log({ url });
            let $ = cheerio.load(url);

            console.log({ $ });
            $('.kno-rdesc div span').each((index, element) => {
                console.log(index);
            });
    })
}


const googleUrl = (isbn) => {
    return `https://www.google.com/search?q=isbn+${isbn}&oq=isbn+${isbn}`
}

let isbn = process.argv[2]
console.log({isbn})
getBookAbstract(isbn)
// module.exports = { getBookAbstract }