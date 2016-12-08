define(['react',
    'classnames',
    'ui/animation/animation'], function (React, classnames, animation) {

    return React.createClass({
        onClick: function () {
            this.props.onClick(this.props.question.option);
        },
        componentWillReceiveProps: function(nextProps) {
            if(nextProps.transition && nextProps.selected && !this.animationStarted) {
                this.animationStarted = true;
                animation.animate(this.container, 'radio--selected')
                    .then(function () {
                        this.props.onSelectAnimationDone && this.props.onSelectAnimationDone();
                    }.bind(this))
            }
        },
        render: function () {
            if (!this.props || !this.props.question || !this.props.onClick) {
                return null;
            }

            var buttonContainerStyle = classnames('question_buttons animatable margin--vertical--medium question__buttons flex center center-items', {
                'radio--not-selected': this.props.transition && !this.props.selected
            });
            var question = this.props.question;

            return <div onClick={this.onClick}
                        className={buttonContainerStyle} ref={function(c) { this.container = c}.bind(this)}>
                <div>
                    <div className="center center-items flex">
                        <div className="question_buttons__container ui-position--relative flex row">
                            <div className="number">{question.number}</div>
                            <div className="answer">{question.name}</div>
                            <img className="radio-question__image" src={question.picture}/>
                        </div>
                    </div>
                </div>
            </div>
        }
    })
});