const OCR = require("./ocr");
const Proompter = require("./proompter")

class Agent {
    constructor(degreeAuditPDF) { 
        this.degreeAuditPDF = degreeAuditPDF;
        this.degreeAuditText = null;
        this.recommendedSchedules = null;
    }

    // basic template for agent
    run = async () => {
        this.degreeAuditText = OCR.getDegreeAuditText(this.degreeAuditPDF);
        this.recommendedSchedules = Proompter.getRecommendations(this.degreeAuditText);
        return this.recommendedSchedules;
    }
}

module.exports = Agent;