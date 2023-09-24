const { ECDH } = require("crypto");
const { randomStringToHash24Bits } = require("./utils/helpers");

class scheduleBuilder {
    constructor(){
        this.dbStuff = null;
    }

    getRecommendations = (remainingCourses) => {
        console.log('schedule');
        // resolve with grouping
        // pick 5, 2 gen ed, 3 cores
        const groups = {gened: {}, core:[]};
        const remainingGeneds = remainingCourses.geneds;
        for (requirement in remainingGeneds){
            const group = getAllGeneds(requirement); // mongo
            groupings.gened[requirement] = group;
        }
        const remainingCores = remainingCourses.cores;
        for (element in remainingCores){
            if (typeof element === "string") {
                groupings.core.push = [element];
            }
            else {
                if (element[element.length-1] === "RANGE"){
                    const range = [element[0], element[1]];
                    const group = getAllCores(range); // mongo
                    groupings.core.push(group);
                }
                else{
                    groupings.core.push(element);
                }
            }
        }
        const recs = []
        const i = 0;
        for (group in groups.gened){
            if (i >= 2){
                break;
            }
            recs.push(group[0]);
            i++;
        }
        const i = 0;
        for (group in groups.core){
            if (i >= 3){
                break;
            }
            recs.push(group[0]);
            i++;
        }
        const finalrecs = getFinalRecs(recs);
        return finalrecs;
    }
}

module.exports = scheduleBuilder;