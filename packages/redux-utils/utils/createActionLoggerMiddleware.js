const chalk = require('chalk')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { filter, map, pluck } = require('rxjs/operators')
const { Subject } = require('rxjs')

const title = (
	chalk
	.cyan
	.bgBlue
	.bold('[Action]')
)

const createActionTypeLogger = ({
	actionsBlacklist = [],
}) => (
	new Subject()
	.pipe(
		pluck('type'),
		filter(type => (
			!(
				actionsBlacklist
				.includes(type)
			)
		)),
		map(type => (
			type
			.match(/^(.+)(::)(.+)$/)
			|| [type]
		)),
		map(([
			type,
			actionTypeGroup,
			delimiter,
			actionType,
		]) => (
			actionTypeGroup
			? (
				chalk
				.grey(actionTypeGroup)
				.concat(
					chalk
					.green(delimiter)
				)
				.concat(
					chalk
					.magentaBright(actionType)
				)
			)
			: (
				chalk
				.magentaBright(type)
			)
		)),
		catchEpicError(),
	)
)

const createActionLoggerMiddleware = (
	middlewareOptions = {},
) => {
	const actionTypeLogger$ = (
		createActionTypeLogger(middlewareOptions)
	)

	actionTypeLogger$
	.subscribe(message => (
		console
		.info(
			title,
			message,
		)
	))

	return (
		() => next => action => {
			actionTypeLogger$
			.next(action)

			next(action)
		}
	)
}

module.exports = createActionLoggerMiddleware
