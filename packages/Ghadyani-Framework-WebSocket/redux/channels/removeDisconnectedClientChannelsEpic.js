const { map, mergeMap, tap } = require('rxjs/operators')
const { of } = require('rxjs')
const { ofType } = require('redux-observable')

const stateSelector = require('@ghadyani-framework/node/redux/utils/rxjs/stateSelector')
const { getChannelsList } = require('./selectors')
const { leaveChannel } = require('$redux/channels/actions')
const { REMOVE_CLIENT } = require('$redux/clients/actions')

const removeDisconnectedClientChannelsEpic = (action$, state$) => (
	action$
	.pipe(
		ofType(REMOVE_CLIENT),
		mergeMap(({ connection }) => (
			stateSelector({
				selector: getChannelsList,
				state$,
			})
			.pipe(
				map(channelName => (
					leaveChannel({
						connection,
						namespace: channelName,
					})
				)),
				map(of),
			)
		)),
	)
)

module.exports = removeDisconnectedClientChannelsEpic
