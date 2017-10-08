export default [
    {
        condition: (spec) => spec.atNight,
        action: (result) => result.push("whispering death")
    },
    {
        condition: (spec) => spec.seasons && spec.seasons.includes("winter"),
        action: (result) => result.push("beefy")
    }
];