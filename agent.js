const path = require('path')
const extract = require('pdf-text-extract')
// const Proompter = require("./proompter")

class Agent {
    constructor(degreeAuditPDF) {
        this.degreeAuditPDF = degreeAuditPDF;
        this.degreeAuditText = null;
        this.recommendedSchedules = null;
    }

    getSchedules(degreeAuditPDF) {
        var filePath = path.join(__dirname, 'uploads/test.pdf')
        extract(filePath, function (err, pages) {
            if (err) {
                console.dir(err)
                return
            }
            console.dir(pages)
        })

        // this.recommendedSchedules = Proompter.getRecommendations(this.degreeAuditText);
        // return this.recommendedSchedules;
    }
}

module.exports = Agent;