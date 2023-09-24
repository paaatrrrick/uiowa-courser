// const OCR = require("./ocr");
const Proompter = require("./proompter")
const scheduleBuilder = require("./scheduleBuilder")

class Agent {
    constructor(degreeAuditPDF) {
        this.degreeAuditPDF = degreeAuditPDF;
        this.degreeAuditText = null;
        this.proompter = new Proompter();
        this.scheduleBuilder = new scheduleBuilder();
    }

    // basic template for agent
    ready = async () => {
        // this.degreeAuditText = OCR.getDegreeAuditText(this.degreeAuditPDF);
        const proompter = new Proompter(this.degreeAuditText);
        const remaining = this.proompter.getMissing();
        const recommendedSchedules = this.scheduleBuilder.getRecommendations();
        return recommendedSchedules;
    }

    // todo
    amendSchedules = async () => {

    }
}

module.exports = Agent;