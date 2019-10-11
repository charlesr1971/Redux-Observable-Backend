#!/usr/bin/env node
require('better-module-alias')(__dirname)

// Load this before any other file to ensure uncaught errors are logged
const logUncaughtExceptions = require('$utils/logUncaughtExceptions')

logUncaughtExceptions
.subscribe()

const createDeprecationFunction = require('$utils/createDeprecationFunction')
const simpleMap = require('$utils/simpleMap')

module.exports = {
	createDeprecatedFunction: (
		createDeprecationFunction({
			adapter: createDeprecationFunction,
			deprecatedMethodName: 'createDeprecatedFunction',
			replacementMethodName: 'createDeprecationFunction',
		})
	),
	createDeprecationFunction,
	deprecateArgument: require('$utils/deprecateArgument'),
	removeFilePathFromRequireCache: require('$utils/removeFilePathFromRequireCache'),
	safeImport: require('$utils/safeImport'),
	simpleMap: (
		createDeprecationFunction({
			deprecatedMethodName: 'simpleMap',
			func: simpleMap,
		})
	),
	tryCatchFinally: require('$utils/tryCatchFinally'),
}
