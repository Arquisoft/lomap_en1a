export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:
        [
            "**/src/**",
            "!**/src/configuration.json",
            "**/src/business/**",
            "!**/src/business/repositories/**",
            // "**/src/controllers/**",
            // "**/src/repositories/**",
        ]
}