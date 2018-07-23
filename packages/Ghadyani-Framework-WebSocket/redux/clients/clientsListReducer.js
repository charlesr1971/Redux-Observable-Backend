const createReducer = require('@ghadyani-framework/node/redux/utils/createReducer')

const {
	ADD_CLIENT,
	REMOVE_CLIENT,
} = require('./actions')

const initialState = new Set()

const reducerActions = {
	[ADD_CLIENT]: (
		(prevState, { connection }) => (
			new Set(prevState)
			.add(connection)
		)
	),

	[REMOVE_CLIENT]: (
		(prevState, { connection }) => {
			const nextState = (
				new Set(prevState)
			)

			nextState
			.delete(connection)

			return nextState
		}
	),
}

const clientsListReducer = (
	createReducer(
		reducerActions,
		initialState,
	)
)

module.exports = clientsListReducer