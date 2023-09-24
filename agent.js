// const OCR = require("./ocr");
const Proompter = require("./proompter")
const scheduleBuilder = require("./scheduleBuilder")
const path = require('path')
const fs = require('fs')
const extract = require('pdf-text-extract')

class Agent {
    constructor(degreeAuditPDFPath) {
        this.degreeAuditPDFPath = degreeAuditPDFPath;
        this.degreeAuditText = null;
        this.scheduleBuilder = null;
    }

    /* 
    *
    *   @param {string} pathToPdf - path to pdf file
    *  @returns {string} - text from pdf
    *   
    */
    getText = (pathToPdf) => {
        var filePath = path.join(__dirname, pathToPdf)
        extract(filePath, function (err, pages) {
            if (err) {
                console.dir(err)
                return
            }
            console.log(pages.join(''));
            fs.writeFileSync('./dump.txt', pages.join(''), 'utf-8');
            return pages.join('');
        })
    }

    // basic template for agent
    ready = async () => {
        this.degreeAuditText = this.getText(this.degreeAuditPDFPath);
        const proompter = new Proompter(this.degreeAuditText);
        this.remaining = proompter.getMissing();

        return this.recommendedSchedules;
    }

    // todo
    amendSchedules = async () => {

    }
}

module.exports = Agent;