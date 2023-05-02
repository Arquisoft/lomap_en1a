export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:
        [
            "**/src/**",
            "!**/src/configuration.json"
        ]
}