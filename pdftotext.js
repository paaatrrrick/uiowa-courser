const path = require('path')
const fs = require('fs')
const extract = require('pdf-text-extract')

var filePath = path.join(__dirname, './audit-request.pdf')
extract(filePath, function (err, pages) {
    if (err) {
        console.dir(err)
        return
    }
    console.log(pages.join(''));
    fs.writeFileSync('./dump.txt', pages.join(''), 'utf-8');
})