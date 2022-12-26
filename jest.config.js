module.exports = {
    automock: false,
    transform: {"\\.ts$": ['ts-jest']},
    globals: {
        'ts-jest': {
            diagnostics: {
                exclude: ['**'],
            },
        },
    },
};