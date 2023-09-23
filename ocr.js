const { createWorker } = require('tesseract.js');
const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');

class OCR {
    constructor() {
        this.worker = createWorker({
            logger: m => console.log(m),
        });
    }

    getDegreeAuditText = async (degreeAuditPDFPath) => {
        try {
            // Read the PDF file
            const pdfDataBuffer = fs.readFileSync(degreeAuditPDFPath);

            // Extract text from the PDF
            const pdfText = await pdf(pdfDataBuffer);

            // Use Tesseract.js to recognize text
            const text = await this.worker.recognize(pdfText, 'eng', {
                logger: m => console.log(m),
            });

            return text.data.text;
        } catch (error) {
            console.error('Error extracting text from PDF:', error);
            throw error;
        }
    }
}

module.exports = OCR;