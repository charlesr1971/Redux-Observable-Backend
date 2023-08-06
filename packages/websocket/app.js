require('better-module-alias')(__dirname) // Include this import before local imports.
const { logUncaughtExceptions } = require('@redux-observable-backend/core')

logUncaughtExceptions()

const { applyMiddleware, createStore } = require('redux')
const { createActionLoggerMiddleware } = require('@redux-observable-backend/redux-utils')
const { createConfigurationSet, runTasks } = require('@redux-observable-backend/node')
const { createEpicMiddleware } = require('redux-observable')
const { of } = require('rxjs')
const { tap } = require('rxjs/operators')

console.log("A:");

const {
	createHttpServers,
	createWebSocketServers,
} = require('./')

console.log("B:");

const {
	rootEpic,
	rootReducer,
} = require('$redux')

console.log("C:");

const actionLoggerMiddleware = (
	createActionLoggerMiddleware()
)

console.log("D:");

const epicMiddleware = createEpicMiddleware()

const middleware = (
	applyMiddleware(
		actionLoggerMiddleware,
		epicMiddleware,
	)
)

console.log("E:");

const store = (
	createStore(
		rootReducer,
		middleware,
	)
)

console.log("F:");

epicMiddleware
.run(rootEpic)

console.log("G:");

of(store)
.pipe(
	tap(createConfigurationSet({})),
	tap(createHttpServers()),
	tap(createWebSocketServers()),
	tap(
		runTasks(
			//'lint',
			'serve',
		)
	),
)
.subscribe()

console.log("H:");
