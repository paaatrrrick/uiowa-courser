const { createWorker } = require('tesseract.js');
const path = require('path');
const fs = require('fs');

class OCR {
    constructor() {
        this.worker = createWorker({
            logger: m => console.log(m),
        });
    }

    getDegreeAuditText = async (degreeAuditPDF) => {
        await this.worker.load();
        await this.worker.loadLanguage('eng');
        await this.worker.initialize('eng');
        const { data: { text } } = await this.worker.recognize(degreeAuditPDF);
        await this.worker.terminate();
        return text;
    }
}