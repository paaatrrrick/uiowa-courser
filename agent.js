const path = require('path')
const extract = require('pdf-text-extract')
// const Proompter = require("./proompter")
const Proompter = require("./proompter")
const PdfToText = require("./pdftotext")

class Agent {
    constructor(degreeAuditPDF) {
        this.degreeAuditPDF = degreeAuditPDF;
        this.degreeAuditText = null;
        this.recommendedSchedules = null;
    }

    // basic template for agent
    ready = async () => {
        const pdftotext = new PdfToText()
        this.degreeAuditText = await pdftotext.getText(this.degreeAuditPDF);
        // const proompter = new Proompter(this.degreeAuditText);
        // this.recommendedSchedules = proompter.getRecommendations();
        // return this.recommendedSchedules;
        console.log(this.degreeAuditText);
    }

    // todo
    amendSchedules = async () => {

    }
}

module.exports = Agent;