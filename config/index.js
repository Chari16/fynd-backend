const env = process.env.NODE_ENV || 'development'

const config = {
    secrets: {
        jwt: "ITSMYSECRET",
        jwtExp: '2 days'
    },
    V1: 'v1',
    isDev: env === 'development',
	isProd: env === 'production',
    isTest: env === 'test',
    assurekitEndPoint: "https://demo.assurekit.com/api/v1"
}

module.exports = config;