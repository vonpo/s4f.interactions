define([
    'Action',
    'interaction/service'], function (Action,
                                      InteractionService) {

    function getInteraction(name) {
        return function (dispatch) {
            dispatch({type: GET_INTERACTION.IN_PROGRESS});

            return InteractionService
                .getInteraction(name)
                .then(function (interaction) {
                    dispatch({type: GET_INTERACTION.SUCCESS, value: interaction});
                })
                .catch(function () {
                    dispatch({type: GET_INTERACTION.FAIL});
                })
        }
    }

    function voteInteraction(option) {
        return function (dispatch, getState) {
            var interactionName = getState().interaction.name;

            return InteractionService
                .vote(interactionName, option)
                .then(function () {
                    dispatch({type: VOTE_INTERACTION.SUCCESS});
                })
                .catch(function () {
                    dispatch({type: VOTE_INTERACTION.FAIL});
                })
        }
    }

    function selectInteractionItem(option) {
        return function (dispatch, getState) {
            dispatch({type: SELECT_INTERACTION_ITEM.IN_PROGRESS, value: option});

            return voteInteraction(option)(dispatch, getState);
        };
    }

    function canVote(tempVote) {
        return function (dispatch) {
            InteractionService
                .triggerWhenCanVote(tempVote)
                .then(function (result) {
                    dispatch({type: result ? CAN_VOTE_INTERACTION.SUCCESS : CAN_VOTE_INTERACTION.FAIL})
                })
        }
    }

    var GET_INTERACTION = new Action('getInteraction', getInteraction);
    var SELECT_INTERACTION_ITEM = new Action('selectInteractionItem', selectInteractionItem);
    var VOTE_INTERACTION = new Action('voteInteraction', voteInteraction);
    var CAN_VOTE_INTERACTION = new Action('canVoteInteraction', canVote);

    return {
        getInteraction: GET_INTERACTION,
        selectInteractionItem: SELECT_INTERACTION_ITEM,
        canVoteAgain: CAN_VOTE_INTERACTION,
        voteInteraction: VOTE_INTERACTION,
        boot: 'INTERACTION_BOOT',
        restart: 'RESTART_INTERACTION',
    }
});