// const OCR = require("./ocr");
const Proompter = require("./proompter")
const scheduleBuilder = require("./scheduleBuilder")

class Agent {
    constructor(degreeAuditPDF) {
        this.degreeAuditPDF = degreeAuditPDF;
        this.degreeAuditText = null;
        this.scheduleBuilder = null;
    }

    // basic template for agent
    ready = async () => {
        // this.degreeAuditText = OCR.getDegreeAuditText(this.degreeAuditPDF);
        const proompter = new Proompter(this.degreeAuditText);
        this.remaining = proompter.getMissing();

        return this.recommendedSchedules;
    }

    // todo
    amendSchedules = async () => {

    }
}

module.exports = Agent;