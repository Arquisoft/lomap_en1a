export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:
        [
            "**/src/**"
        ]
}