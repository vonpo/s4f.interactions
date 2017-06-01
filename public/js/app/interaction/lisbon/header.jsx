define(['react'], function (React) {
    var Header = React.createClass({
        displayWhenVoted: function () {
            if (this.props.vote) {
                return null;
            }

            return <div className="flex center-items center thanks">
                <div className="md-title ui-text-align--center ui-text--white">THANKS FOR THE
                    VOTE
                </div>
                <div className="md-title ui-text-align--center ui-text--white">SEE RESULTS ON THE
                    SCREEN!
                </div>
                <button id="oneMoreTime" onClick={this.props.restartVote} className="demo__option margin--vertical--big ui-text-align--center">
                    VOTE AGAIN!
                </button>
            </div>
        },
        onClick: function (option) {
            this.props.onClick(option);
            document.getElementById(option).classList.add('tada');
            setTimeout(function () {
                this.props.selectItemDone();
            }.bind(this), 800)

        },
        render: function () {
            if(this.props.voted) {
                return this.displayWhenVoted();
            }

            return <div className="flex space-around center-items header">
                <div>
                    <div className="flex center center-items">
                        <div className="demo__circle margin--vertical--big ui-position--relative ui-font--bold flex center center-items">
                            <div className="demo__circle__text text">
                                VOTE
                            </div>
                            <div className="demo__circle__text text">
                                NOW
                            </div>
                        </div>
                    </div>
                    <div className="ui-text-align--center margin--vertical--big ui-font--bold question text">
                        Que equipa vai ganhar a liga nos 17/18?
                    </div>
                    <div>
                        <div className="buttons flex row space-around">
                            <button id="benfica" onClick={this.onClick.bind(this, 'benfica')}
                                    className="text demo__option ui-text-align--center animatable flex center-items animated">
                                <img src="/img/lisbon/benfica.png" className="demo-vote__option--benfica"></img>
                                <div className="ui-text-align--center">S.L. BENFICA</div>
                            </button>
                            <button id="porto" onClick={this.onClick.bind(this, 'porto')}
                                    className="text demo__option ui-text-align--center animatable flex center-items animated">
                                <img src="/img/lisbon/porto.png" className="demo-vote__option--porto" />
                                <div className="ui-text-align--center">F.C. PORTO</div>
                            </button>
                        </div>
                        {/*<div className="ui--full-width vote-options flex row space-around">*/}
                            {/*<img className="demo-vote__option demo-vote__option--benfica" src="/img/lisbon/benfica.jpg"/>*/}
                            {/*<div className="demo-vote__option demo-vote__option--porto" src="/img/lisbon/porto.png"></div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        }
    });

    return Header;
});