define(['react', 'classnames',], function (React, classnames) {

    var Header = React.createClass({
        displayOnVoteDone: function () {
            if(!this.props.voted) {
                return null;
            }

            return  <div className="flex center center-items" style={{marginTop:'65px'}}>
                <div className="question-text ui-text-shadow big margin--vertical--big ui-text-align--center">
                    ZERKNIJ NA TELEBIM!
                </div>
                
                {!this.props.wait ?
                    <button className="button ui-text-shadow" id="oneMoreTime">
                        <div onClick={this.props.restartVote} className="ui-position--relative padding--horizontal--medium padding--vertical--medium md-headline ui-text-align--center ">
                            ZAGŁOSUJ JESZCZE RAZ!
                        </div>
                    </button> : null}

                {this.props.wait ?
                    <div id="voteInNextMinute" className="question-text ui-text-shadow ui-position--relative padding--horizontal--medium padding--vertical--medium md-headline ui-text-align--center">
                        ZAGŁOSUJ PONOWNIE PO UPŁYWIE MINUTY
                    </div> : null }
            </div>
        },
        displayOnVote: function () {
            if (!this.props.vote) {
                return null;
            }

            return <div className="question--zgorzelec md-headline font-color--zgorzelec--primary flex center center-items">
                <div className="ui-text-align--center">
                    WYBIERZ UTWÓR, <br /> MY GO ZAGRAMY!
                </div>
            </div>
        },
        onClick: function (option) {
            this.props.onClick(option);
            this.props.selectItemDone();
        },
        render: function () {
            var style = classnames('ui-position--fixed bring-to-top-top ui--full-width header header--zgorzelec-music fade flex center center-items', {
                'anchored-top': this.props.anchoredToTop
            });

            return <div className="ui--full-width">
                    <div style={{height: '93px'}}>
                    </div>
                    <div className={style} style={{top: 0}}>
                        <div className="half-bg"></div>
                        <img src="/img/zgorzelec/logopgesmall.png" className="bring-to-top header__image" />
                        <div className="line zgorzelec-gradient"></div>
                    </div>
                    {this.displayOnVote()}
                    {this.displayOnVoteDone()}
                </div>
        }
    });

    return Header;
});