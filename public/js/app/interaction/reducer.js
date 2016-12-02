define(['interaction/actions'], function (InteractionActions) {

    return function (state, action) {
        state = state || {};

        switch(action.type) {
            case InteractionActions.getInteraction.IN_PROGRESS: {
                return {
                    loading : true
                }
            }
            case InteractionActions.getInteraction.SUCCESS: {
                return {
                    loading: false,
                    interaction: action.value
                }
            }
            case InteractionActions.selectInteractionItem.IN_PROGRESS: {
                return {
                    loading: state.loading,
                    interaction: state.interaction,
                    selectedItem: action.value
                }
            }
            default: {
                return {}
            }
        }
    }
});