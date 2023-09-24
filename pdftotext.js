const path = require('path')
const fs = require('fs')
const extract = require('pdf-text-extract')

class pdftotext{
    constructor(){
        this.testFilePath = path.join(__dirname, './audit-request.pdf');
    }

extract = (filePath, function (err, pages) {
    if (err) {
        console.dir(err)
        return
    }
    console.log(pages.join(''));
    fs.writeFileSync('./dump.txt', pages.join(''), 'utf-8');
})

}
module.exports = extract;