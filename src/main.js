import recommender from './recommender.js';
import { loadJson } from './recommendationModel.js';

let spec = {
    atNight: false,
    seasons: ["winter"],
    country: "sparta",
    minDuration: 1000
};

loadJson();
let result = recommender(spec);
console.log(result);