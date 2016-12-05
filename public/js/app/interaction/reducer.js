define(['_', 'interaction/actions',], function (_, InteractionActions) {

    return function (state, action) {
        state = state || {};

        switch (action.type) {
            case InteractionActions.canVoteAgain.SUCCESS: {
                return _.extend({}, {}, state, {
                    canVoteAgain: true
                })
            }
            case InteractionActions.restart: {
                return _.extend({}, state, {
                    phase: 'vote',
                    canVoteAgain: false
                })
            }
            case InteractionActions.boot: {
                var alreadyVoted = !!action.value.vote;
                return {
                    canVoteAgain: false,
                    phase: alreadyVoted ? 'voteDone' : 'vote',
                    voteInProgress: alreadyVoted ? false : undefined
                }
            }
            case InteractionActions.getInteraction.IN_PROGRESS: {
                return _.extend({}, state, {
                    loading: true
                })
            }
            case InteractionActions.getInteraction.SUCCESS: {
                action.value.data.options = action.value.data.options.filter(function (answer) {
                    return answer.enabled;
                });

                return _.extend({}, state, {
                    loading: false,
                    interaction: action.value,
                    phase: state.phase || 'vote'
                });
            }
            case InteractionActions.voteInteraction.SUCCESS: {
                return _.extend({}, state, {
                    phase: 'voteDone',
                });
            }
            case InteractionActions.voteInteraction.FAIL: {
                return _.extend({}, state, {
                    phase: 'voteFail',
                });
            }
            case InteractionActions.selectInteractionItem.SUCCESS: {
                return _.extend({}, state, {
                    voteInProgress: false,
                    selectedItem: action.value
                });
            }
            case InteractionActions.selectInteractionItem.IN_PROGRESS: {
                return _.extend({}, state, {
                    canVoteAgain: false,
                    voteInProgress: true,
                    selectedItem: action.value
                });
            }
            default: {
                return state
            }
        }
    }
});