define([
    'react',
    'ReactRedux',
    'Reselect',
    '_',
    'classnames',
    'interaction/actions',
    'url/service',
    'interaction/service'], function (React,
                                      ReactRedux,
                                      Reselect,
                                      _,
                                      classnames,
                                      InteractionActions,
                                      UrlService,
                                      InteractionService) {
    var getInteraction = function (data) {
        return data;
    };

    var intervalId = null;

    function startRefreshInteraction(onInterval) {
        if(intervalId !== null) {
            return;
        }

        intervalId = setInterval(onInterval, 1000 * 30); // 30 sec
    }

    function stopRefreshInteraction() {
        if(intervalId !== null) {
            clearInterval(intervalId);
        }
    }

    var Interaction = React.createClass({
        getInitialState: function () {
            this.interactionId = UrlService.extractUrl(location.pathname)[0];

            return {
                anchoredToTop: true
            };
        },
        componentWillReceiveProps: function (nextProps) {
            if(nextProps.interaction) {
                if(!this.props.interaction) {
                    var directory = nextProps.interaction.data.directory;

                    require(['interaction/' + directory + '/header',
                            'interaction/' + directory + '/footer',
                            'interaction/' + directory + '/content'],
                        function (HeaderContent, FooterContent, Content) {
                            this.HeaderContent = HeaderContent;
                            this.FooterContent = FooterContent;
                            this.Content = Content;
                            this.forceUpdate();

                        }.bind(this));
                }

                if(!nextProps.interaction.isStarted && !nextProps.interaction.isFinished) {
                    var refreshInteraction = this.props.fetchInteraction.bind(this, this.interactionId);
                    startRefreshInteraction(refreshInteraction);
                }

                if(nextProps.interaction.isStarted) {
                    stopRefreshInteraction();
                }
            }
        },
        componentDidMount: function () {
            this.props.fetchInteraction(this.interactionId);
            this.onScroll = _.debounce(function () {
                if(!this.header) {
                    return;
                }

                var header = this.header.getBoundingClientRect();
                this.setState({anchoredToTop: header.top >= 0, anchoredToBottom: window.innerHeight === header.bottom})

            }.bind(this), 50);

            window.addEventListener('resize', this.onScroll);
            window.addEventListener('scroll', this.onScroll);
            this.props.canDoNextVote(InteractionService.getTempVote(this.interactionId));
        },
        componentWillUnmount: function () {
            window.removeEventListener('scroll', this.onScroll);
            window.removeEventListener('resize', this.onScroll);
        },
        onSelectItem: function (option) {
            if (this.props.selectedItem) {
                return;
            }

            this.props.selectItem(option, this.interactionId);
        },
        onSelectAnimationDone: function () {
            this.props.selectItemDone();
            window.scrollTo(0, 0);
        },
        restartVote: function () {
            this.props.restartVote();
        },
        render: function () {
            if (!this.props.interaction || !this.HeaderContent) {
                return null;
            }

            var style = classnames('interaction flex max-height', this.props.interaction.data.cssClass);

            return <div className={style} ref={function (h) {
                this.header = h
            }.bind(this)}>
                {React.createElement(this.HeaderContent, {
                    vote: this.props.vote,
                    voted: this.props.voted,
                    wait: !this.props.canVoteAgain,
                    isNotStarted: this.props.isNotStarted,
                    isFinished: this.props.isFinished,
                    restartVote: this.restartVote,
                    anchoredToTop: this.state.anchoredToTop,
                    selectItemDone: this.onSelectAnimationDone,
                    isFailed: this.props.isFailed,
                    onClick: this.onSelectItem
                })}
                {React.createElement(this.FooterContent, {
                    anchoredToTop: this.state.anchoredToTop,
                    anchoredToBottom: this.state.anchoredToBottom
                })}
                { this.props.vote ? this.props.interaction.data.options.map(function (question) {
                    return React.createElement(this.Content, {
                        question: question,
                        key: question.option,
                        onSelectAnimationDone: this.onSelectAnimationDone,
                        transition: typeof this.props.selectedItem !== 'undefined',
                        selected: question.option === this.props.selectedItem,
                        onClick: this.onSelectItem
                    });
                }.bind(this)) : null}
            </div>;
        }
    });

    var mapStateToProps = Reselect.createSelector(
        [getInteraction],
        function (data) {

            return {
                interaction: data.interaction,
                selectedItem: data.selectedItem,
                canVoteAgain: data.canVoteAgain,
                isNotStarted: data.phase === 'notStarted',
                isFinished: data.phase === 'finished' && !data.voteInProgress,
                isFailed: data.phase === 'voteFail' && !data.voteInProgress,
                vote: data.phase === 'vote' || data.voteInProgress === true,
                voted: data.phase === 'voteDone' && !data.voteInProgress
            }
        }
    );

    var mapDispatchToProps = function (dispatch) {
        return {
            canDoNextVote: function (tempVote) {
              dispatch(InteractionActions.canVoteAgain.action(tempVote))
            },
            restartVote: function () {
              dispatch({type: InteractionActions.restart})
            },
            selectItemDone: function () {
                dispatch({type: InteractionActions.selectInteractionItem.SUCCESS})
            },
            selectItem: function (option, interactionId) {
                dispatch(InteractionActions.selectInteractionItem.action(option))
                    .then(function () {
                        dispatch(InteractionActions.canVoteAgain.action(InteractionService.getTempVote(interactionId)))
                    })
            },
            fetchInteraction: function (name) {
                dispatch(InteractionActions.getInteraction.action(name))
            }
        };
    };

    return ReactRedux.connect(
        mapStateToProps,
        mapDispatchToProps
    )(Interaction);
});