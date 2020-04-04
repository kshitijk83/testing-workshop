module.exports = {
    testEnvironment: 'jsdom',
    testURL: "http://localhost",
    moduleNameMapper: {
        '\\.module\\.css$': 'identity-obj-proxy',
        '\\.css$': require.resolve('./test/style-mock')
    }
}