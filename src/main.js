import recommender from './recommender.js';
import { loadJson } from './recommendationModel.js';

let spec = {
    atNight: false,
    seasons: ["summer"],
    country: "sparta",
    minDuration: 300
};

loadJson();
let result = recommender(spec);
console.log(result);