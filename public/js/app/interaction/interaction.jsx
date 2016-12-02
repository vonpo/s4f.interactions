define([
    'react',
    'ReactRedux',
    'Reselect',
    '_',
    'classnames',
    'interaction/actions',
    'url/service'], function (React,
                              ReactRedux,
                              Reselect,
                              _,
                              classnames,
                              InteractionActions,
                              UrlService) {
    var getInteraction = function (data) {
        return data;
    };

    var Interaction = React.createClass({
        getInitialState: function () {
            return {
                anchoredToTop: true
            };
        },
        componentDidMount: function () {
            this.interactionId = UrlService.extractUrl(location.pathname)[0];
            this.props.fetchInteraction(this.interactionId);
            this.onScroll = _.throttle(function () {
                var header = this.header.getBoundingClientRect();
                this.setState({anchoredToTop: header.top >= 0, anchoredToBottom: window.innerHeight === header.bottom})

            }.bind(this), 100);

            require(['interaction/' + this.interactionId + '/header',
                    'interaction/' + this.interactionId + '/footer',
                    'interaction/' + this.interactionId + '/content'],
                function (HeaderContent, FooterContent, Content) {
                    this.HeaderContent = HeaderContent;
                    this.FooterContent = FooterContent;
                    this.Content = Content;
                    this.forceUpdate();

                }.bind(this));

            window.addEventListener('scroll', this.onScroll)
        },
        componentWillUnmount: function () {
            window.removeEventListener('scroll', this.onScroll)
        },
        onSelectItem: function(option) {
            if(this.props.selectedItem) {
                return;
            }
            console.info('on select item');
            this.props.selectItem(option);
        },
        render: function () {
            if (!this.props.interaction || !this.HeaderContent) {
                return null;
            }

            var style = classnames('interaction flex max-height', this.props.interaction.data.cssClass);

            return <div className={style} ref={function (h) {this.header = h}.bind(this)}>
                {React.createElement(this.HeaderContent)}
                { this.props.interaction.data.options.map(function (question) {
                    return React.createElement(this.Content, {
                        question: question,
                        key: question.option,
                        transition: typeof this.props.selectedItem !== 'undefined',
                        selected: question.option === this.props.selectedItem,
                        onClick: this.onSelectItem
                    });
                }.bind(this))}
                {React.createElement(this.FooterContent, {
                    anchoredToTop: this.state.anchoredToTop,
                    anchoredToBottom: this.state.anchoredToBottom
                })}
            </div>;
        }
    });

    var mapStateToProps = Reselect.createSelector(
        [getInteraction],
        function (data) {
            return {
                interaction: data.interaction,
                selectedItem: data.selectedItem
            }
        }
    );

    var mapDispatchToProps = function (dispatch) {
        return {
            selectItem: function(option) {
                dispatch(InteractionActions.selectInteractionItem.action(option))
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