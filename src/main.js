import recommender from './recommender.js';

let spec = {
    atNight: false,
    seasons: ["winter"],
    country: "sparta",
    minDuration: 300
};

let result = recommender(spec);
console.log(result);