const axios = require('axios');
const fs = require('fs');

// CHANGE THIS
// 20238 = Spring 2024
// 20233 = Fall 2023
// 20235 = Winter 2023
const term = "20235";

let courses = "ACCT\nACTS\nAERO\nAFAM\nASP\nASL\nASLE\nAMST\nACB\nANES\nANIM\nANTH\nAMCS\nARAB\nARTE\nARTH\nASIA\nSOAS\nASTR\nAT\nBBC\nBMB\nBIOL\nBME\nBMED\nBIOS\nRSBI\nBUS\nBAIS\nCBIO\nCTS\nRSCI\nCCP\nMED\nCDE\nHRTS\nCIAE\nCERM\nCBE\nCHEM\nCHIN\nCINE\nCEE\nCLSA\nCSI\nCPH\nCSD\nCOMM\nCBH\nCL\nRSCT\nCS\nENGR\nCSED\nCW\nCNW\nCRIM\nCCCC\nDANC\nDATA\nDPH\nDENT\nDERM\nDSGN\nRSMS\nDIGA\nDST\nDPA\nWLLC\nDRAW\nEMTP\nEES\nECON\nEHOP\nEALL\nEDTL\nEPLS\nECE\nEM\nENDO\nEIT\nENGL\nESL\nENTR\nENVS\nEPID\nEVNT\nFAMD\nFAM\nFIN\nFRRB\nFREN\nGWSS\nARTS\nGENE\nGEOG\nGSND\nGRMN\nGHS\nGRAD\nMBA\nCLSG\nHMP\nHHP\nHPAS\nHIST\nHONR\nDIET\nTOX\nIMMU\nISE\nINTD\nIGPI\nINTM\nIM\nINTL\nIS\nIWP\nIBA\nIIEP\nIALL\nISA\nITAL\nJPNS\nJMC\nKORE\nLATH\nCLSL\nLAS\nLATS\nLAW\nLWAB\nLS\nCLAS\nSLIS\nLLS\nLING\nRSMR\nMGMT\nMKTG\nMATH\nME\nMSTP\nMDVL\nMTLS\nMICR\nMILS\nMMED\nMUSM\nMUS\nNAIS\nNEUR\nNSCI\nNSG\nRSNM\nNURS\nOBG\nOEH\nOPER\nOPHT\nOPRM\nORSC\nOMFS\nORDN\nORTH\nOTP\nOTO\nPNTG\nBKAT\nPATH\nPEDO\nPEDS\nPERF\nPERI\nPCOL\nPHAR\nPHIL\nPHTO\nPTRS\nPA\nPHYS\nMPB\nPOLI\nPORT\nPCD\nPRNT\nPROS\nPSYC\nPSQF\nPSY\nPBAF\nRADO\nRSP\nRSTH\nRSRT\nRAD\nRELS\nRHET\nRUSS\nSSW\nSIED\nSCLP\nSLA\nSSTP\nSJUS\nSOC\nSPAN\nSMC\nSPST\nSRM\nSTAT\nABRD\nSURG\nSUST\nSDG\nSWAH\nTAPE\nTHTR\nTR\nTDSN\nTRNS\nTBM\nREA\nURES\nULIB\nUICB\nUIUB\nURP\nURO\nWRIT";
courses = courses.split("\n");

async function fetchData(subject) {
    const url = `https://www.maui.uiowa.edu/maui/api/pub/registrar/sections/${term}/${subject}`;

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await axios.get(url, { headers: headers });
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log("Error fetching data for " + subject + ".")
        console.error('Error fetching data:', error);
    }
}

fetchData();

async function processCourses(courses) {
    for (let course of courses) {
        let data = await fetchData(course);
        console.log("Pulled data for " + course + ".");
        console.log(`${courses.indexOf(course) + 1}/${courses.length}`);
        
        // Read the current JSON data from ./coreClasses2.json file
        let currentJson = fs.readFileSync('./coreClasses.json', 'utf8');
        currentJson = JSON.parse(currentJson);

        // Append data to currentJson by spreading its contents
        currentJson = [...currentJson, ...data];

        // Write the merged data back to ./coreClasses2.json
        fs.writeFileSync('./coreClasses.json', JSON.stringify(currentJson));
    }
}
processCourses(courses).catch(console.error);