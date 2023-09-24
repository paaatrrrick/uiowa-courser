const Proompter = require("./proompter")
const scheduleBuilder = require("./scheduleBuilder")
const path = require('path')
const fs = require('fs')
const extract = require('pdf-text-extract')

class Agent {
    constructor(degreeAuditPDFPath) {
        this.degreeAuditPDFPath = degreeAuditPDFPath;
        this.degreeAuditText = null;
        this.proompter = new Proompter();
        this.scheduleBuilder = new scheduleBuilder();
    }

    /* 
    *
    *   @param {string} pathToPdf - path to pdf file
    *  @returns {string} - text from pdf
    *   
    */
    getText = (pathToPdf) => {
        extract(pathToPdf, function (err, pages) {
            if (err) {
                console.dir(err)
                return
            }
            fs.writeFileSync('./dump.txt', pages.join(''), 'utf-8');
            return pages.join('');
        })
    }

    // basic template for agent
    ready = async () => {
        this.degreeAuditText = await this.getText(this.degreeAuditPDFPath);
        const remaining = await this.proompter.getMissing(this.degreeAuditText);
        console.log(remaining);
        return;
        const recommendedSchedules = await this.scheduleBuilder.getRecommendations(remaining);
        console.log(recommendedSchedules);
        return recommendedSchedules;
    }

    // todo
    amendSchedules = async () => {

    }
}

module.exports = Agent;