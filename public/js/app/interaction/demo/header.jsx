define(['react'], function (React) {

    var Header = React.createClass({
        displayWhenVoted: function () {
            if (this.props.vote) {
                return null;
            }

            return <div className="flex center-items center">
                <div className="md-title ui-text-align--center margin--vertical--big ui-text--white">THANKS FOR THE
                    VOTE
                </div>
                <div className="md-title ui-text-align--center margin--vertical--big ui-text--white">SEE RESULTS ON THE
                    SCREEN!
                </div>
                <button id="oneMoreTime" onClick={this.props.restartVote} className="demo__option margin--vertical--big ui-text-align--center">
                    VOTE AGAIN!
                </button>
            </div>
        },
        onClick: function (option) {
            this.props.onClick(option);
            this.props.selectItemDone();
        },
        render: function () {
            if(this.props.voted) {
                return this.displayWhenVoted();
            }

            return <div className="flex space-between center-items header">
                <div
                    className="demo__circle margin--vertical--big ui-position--relative ui-font--bold flex center center-items">
                    <div className="demo__circle__text text">
                        VOTE
                    </div>
                    <div className="demo__circle__text text">
                        NOW
                    </div>
                </div>
                <div className="ui-text-align--center margin--vertical--big ui-font--bold question text">
                    WHO IS A MORE NATURALLY GIFTED DRIVER?
                </div>
                <div>
                    <div className="buttons flex row space-around">
                        <button id="voteVettel" onClick={this.onClick.bind(this, 'vettel')}
                                className="text demo__option margin--vertical--medium ui-text-align--center animatable no-margin--bottom">
                            SEBASTIAN <br />VETTEL
                        </button>
                        <button id="voteHamilton" onClick={this.onClick.bind(this, 'hamilton')}
                                className="text demo__option margin--vertical--medium ui-text-align--center animatable">
                            LEWIS <br/> HAMILTON
                        </button>
                    </div>
                    <div className="ui--full-width vote-options flex row space-around">
                        <div className="demo-vote__option demo-vote__option--first"></div>
                        <div className="demo-vote__option demo-vote__option--second"></div>
                    </div>
                </div>
            </div>
        }
    });

    return Header;
});