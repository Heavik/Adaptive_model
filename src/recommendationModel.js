export default [
    {
        condition: (spec) => spec.atNight,
        result: "whispering death"
    },
    {
        condition: (spec) => spec.seasons && spec.seasons.includes("winter"),
        result: "beefy"
    }
];