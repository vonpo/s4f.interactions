define(['react', 'classnames',], function (React, classnames) {

    var Header = React.createClass({
        displayOnVoteDone: function () {
            if(!this.props.voted) {
                return null;
            }

            return  <div className="flex center center-items">
                <div className="text ui-text-shadow big margin--vertical--big ui-text-align--center">
                    ZERKNIJ NA TELEBIM, ŻEBY ZOBACZYĆ KTO JEST NAJLEPSZY!
                </div>

                {!this.props.wait ?
                    <button className="button ui-text-shadow" id="oneMoreTime">
                        <div onClick={this.props.restartVote} className="ui-position--relative padding--horizontal--medium padding--vertical--medium md-headline ui-text-align--center ">
                            ZAGŁOSUJ JESZCZE RAZ!
                        </div>
                    </button> : null}

                {this.props.wait ?
                    <div id="voteInNextMinute" className="text small ui-position--relative padding--horizontal--medium padding--vertical--medium md-headline ui-text-align--center">
                        ZAGŁOSUJ PONOWNIE PO UPŁYWIE MINUTY
                    </div> : null }
            </div>
        },
        displayOnVote: function () {
            if (!this.props.vote) {
                return null;
            }

            return <div className="question--zgorzelec md-headline font-color--zgorzelec--primary flex center center-items">
                <div className="ui-text-align--center text">
                    WYBIERZ ZAWODNIKA MECZU
                </div>
            </div>
        },
        onClick: function (option) {
            this.props.onClick(option);
            this.props.selectItemDone();
        },
        render: function () {
            var style = classnames('ui-position--fixed bring-to-top-top ui--full-width header fade flex center center-items', {
                'anchored-top': this.props.anchoredToTop
            });

            return <div className="ui--full-width">
                    <div style={{height: '84px'}}></div>
                    <div className={style} style={{top: 0}}>
                        <div className="half-bg"></div>
                        <img src="/img/zgorzelec/logopgesmall.png" className="image bring-to-top" />
                        <div className="line zgorzelec-gradient"></div>
                        {/*<svg width="75" height="75" className="left" viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">*/}
                            {/*<line x1="0" y1="0" x2="75" y2="75" strokeWidth="10" stroke="white"></line>*/}
                        {/*</svg>*/}
                        {/*<svg width="75" height="75" className="right" viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">*/}
                            {/*<line x1="0" y1="75" x2="75" y2="0" strokeWidth="10" stroke="white"></line>*/}
                        {/*</svg>*/}
                        {/*<svg className="long-line ui--full-width"  xmlns="http://www.w3.org/2000/svg">*/}
                            {/*<line x1="0" y1="0" x2="100%" y2="0" strokeWidth="20" stroke="white"></line>*/}
                        {/*</svg>*/}
                    </div>
                    <div className="question">
                        {this.displayOnVote()}
                        {this.displayOnVoteDone()}
                    </div>
                </div>
        }
    });

    return Header;
});