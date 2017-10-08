import _ from '../node_modules/lodash/lodash.js';
import getModel from './recommendationModel.js';

export default function(spec) {
    let result = [];
    result = result.concat(executeModel(spec));
    return _.uniq(result);
}

function executeModel(spec) {
    let model = getModel();
    return _.chain(model)
        .filter((r) => isActive(r, spec))
        .map((r) => result(r, spec))
        .flatten()
        .value();
}

function result(rule, spec) {
    if(rule.result === 'value') return rule.resultArgs[0];
    if(rule.result === 'pickMinDuration') {
        return pickMinDuration(spec, rule.resultArgs[0]);
    }
    throw new Error("unknown result function: " + r.result)
}

function isActive(rule, spec) {
    if (rule.condition === 'atNight') return spec.atNight;
    if (rule.condition === 'seasonIncludes') return seasonIncludes(spec, rule.conditionArgs[0]);
    if (rule.condition === 'countryIncludedIn') return countryIncludedIn(spec, rule.conditionArgs);
    if (rule.condition === 'and') return rule.conditionArgs.every((arg) => isActive(arg, spec));
    if (rule.condition === 'pickMinDuration') return true;
    if (rule.condition === 'not') return !isActive(rule.conditionArgs[0], spec);
    throw new Error("unable to handle " + rule.condition);
}

function seasonIncludes(spec, arg) {
    return spec.seasons && spec.seasons.includes(arg);
}

function countryIncludedIn(spec, anArray) {
    return anArray.includes(spec.country);
}

function pickMinDuration(spec, range) {
    if(spec.minDuration)
       return pickFromRange(range, spec.minDuration);
    else return [];
}

function pickFromRange(range, value) {
    const matchIndex = range.findIndex((r) => value < r[0]);
    return range[matchIndex][1];
}