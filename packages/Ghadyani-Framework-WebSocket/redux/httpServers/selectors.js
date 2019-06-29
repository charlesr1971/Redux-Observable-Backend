const { createDeprecatedFunction } = require('@redux-observable-backend/base')

const httpServerSelector = (
	({ httpServers }) => (
		httpServers
		.server
	)
)

module.exports = {
	getHttpServer: (
		createDeprecatedFunction({
			deprecatedMethodName: 'getHttpServer',
			func: httpServerSelector,
			replacementMethodName: 'httpServerSelector',
		})
	),
	httpServerSelector,
}
