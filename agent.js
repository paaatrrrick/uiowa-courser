const OCR = require("./ocr");
// const Proompter = require("./proompter")

class Agent {
    constructor(degreeAuditPDF) {
        this.degreeAuditPDF = degreeAuditPDF;
        this.degreeAuditText = null;
        this.recommendedSchedules = null;
    }

    async getSchedules(degreeAuditPDF) {
        const ocr = new OCR();

        this.degreeAuditText = await ocr.getDegreeAuditText(degreeAuditPDF);
        console.log(this.degreeAuditText);
        // this.recommendedSchedules = Proompter.getRecommendations(this.degreeAuditText);
        // return this.recommendedSchedules;
    }
}

module.exports = Agent;