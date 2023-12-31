const Proompter = require("./proompter")
const scheduleBuilder = require("./schedulebuilder")
const path = require('path')
const fs = require('fs')
const extract = require('pdf-text-extract')

class Agent {
    constructor(degreeAuditPDFPath, specifications, previous, userApiKey) {
        this.specifications = specifications;
        this.degreeAuditPDFPath = degreeAuditPDFPath;
        this.degreeAuditText = null;
        this.proompter = new Proompter(userApiKey);
        this.scheduleBuilder = new scheduleBuilder();
        this.previous = previous;
    }
    /* 
    *
    *   @param {string} pathToPdf - path to pdf file
    *  @returns {string} - text from pdf
    *   
    */
    getText = async (pathToPdf) => {
        var myValue = null;
        extract(pathToPdf, function (err, pages) {
            if (err) {
                console.dir(err)
                return
            }
            fs.writeFileSync('./dump.txt', pages.join(''), 'utf-8');
            myValue = pages.join('');
        })
        while (myValue === null) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        return myValue;
    }

    // basic template for agent
    ready = async () => {
        await this.scheduleBuilder.connect();
        this.degreeAuditText = await this.getText(this.degreeAuditPDFPath);
        const remaining = await this.proompter.getMissing(this.degreeAuditText);
        const recommendedSchedules = await this.scheduleBuilder.getRecommendations(remaining);
        const getSchedules = await this.proompter.buildSchedule(recommendedSchedules, this.specifications, this.previous);
        return getSchedules;
    }

    // todo
    amendSchedules = async () => {

    }
}

module.exports = Agent;