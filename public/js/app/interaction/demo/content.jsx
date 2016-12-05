define(['react',
    'classnames',
    'ui/animation/animation'], function (React, classnames, animation) {

    return React.createClass({
        onClick: function () {
            this.props.onClick(this.props.question.option);
        },
        componentWillReceiveProps: function(nextProps) {
            if(nextProps.transition && nextProps.selected && !this.animationStarted) {
                // this.animationStarted = true;
                // animation.animate(this.container, 'radio--selected')
                //     .then(function () {
                //         this.props.onSelectAnimationDone && this.props.onSelectAnimationDone();
                //     }.bind(this))
            }
        },
        render: function () {
            return null;
        }
    })
});