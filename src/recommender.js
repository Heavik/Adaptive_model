import _ from '../node_modules/lodash/lodash.js';
import getModel from './recommendationModel.js';

export default function(spec) {
    let result = [];
    result = result.concat(executeModel(spec));
    if(spec.seasons && spec.seasons.includes("winter")) result.push("beefy");
    if(spec.seasons && spec.seasons.includes("summer")) {
        if(["sparta", "atlantis"].includes(spec.country)) result.push("white lightening");
    }
    if(spec.minDuration >= 150) {
        if(spec.seasons && spec.seasons.includes("summer")) {
            if(spec.minDuration < 350) result.push("white lightening");
            else if(spec.minDuration < 570) result.push("little master");
            else result.push("wall");
        }
        else {
            if(spec.minDuration < 450) result.push("white lightening");
            else result.push("little master");
        }
    }
    return _.uniq(result);
}

function executeModel(spec) {
    let model = getModel();
    return model
        .filter((r) => isActive(r, spec))
        .map((r) => r.result);
    
}

function isActive(rule, spec) {
    if (rule.condition === 'atNight') return spec.atNight;
    throw new Error("unable to handle " + rule.condition);
}