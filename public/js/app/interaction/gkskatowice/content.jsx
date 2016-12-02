define(['react',
    'classnames'], function (React, classnames) {
    return React.createClass({
        onClick: function () {
            this.props.onClick(this.props.question.option);
        },
        render: function () {
            if (!this.props || !this.props.question || !this.props.onClick) {
                return null;
            }

            var buttonContainerStyle = classnames('question_buttons__container--animatable animatable question__button md-primary no-md-ink-ripple', {
                'radio--not-selected': this.props.transition && !this.props.selected,
                'radio--selected': this.props.transition && this.props.selected,
            });
            var question = this.props.question;

            return <div onClick={this.onClick}
                        className="margin--vertical--medium question__buttons flex center center-items">
                <div className={buttonContainerStyle}>
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