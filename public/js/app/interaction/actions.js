define([
    'Action',
    'interaction/service'], function (
    Action,
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

    function voteInteraction(interaction, option) {


    }

    function selectInteractionItem(item) {
        return { type: SELECT_INTERACTION_ITEM.IN_PROGRESS, value: item}
    }

    var GET_INTERACTION = new Action('getInteraction', getInteraction);
    var SELECT_INTERACTION_ITEM = new Action('selectInteractionItem', selectInteractionItem);

    return {
        getInteraction: GET_INTERACTION,
        selectInteractionItem: SELECT_INTERACTION_ITEM
    }
});