define(['react'], function (React) {

    var Header = React.createClass({
            displayOnVote: function () {
                if(!this.props.vote) {
                    return null;
                }

                return <div>
                    <div
                        className="question-select question-text big ui-position--relative padding--horizontal--small padding--vertical--medium ui-text-align--center">
                        WYBIERZ <img src="/img/katowice/aasa.png"/> MECZU
                    </div>
                    <div className="ui--full-width text--white flex center-items center">
                        <div style={{height: '56px'}}
                             className="zgorzelec__up-down katowice ui-overflow--hidden ui--full-width fade ui-position--relative flex center-items center row">
                            <svg width="40" height="75"
                                 style={{width: '40px', left: 0, top: '-18px', marginLeft: '-10px', height: '80px'}}
                                 className="header__line--katowice" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="0,75 40,0 40,75" fill="#ffe200"></polygon>
                            </svg>
                            <div style={{
                                position: 'absolute',
                                height: '10px',
                                background: '#ffe200',
                                left: '20px',
                                right: '20px',
                                zIndex: 2,
                                top: 0
                            }}></div>
                            <svg className="header__line--katowice line--bottom--katowice--left" width="40" height="75"
                                 xmlns="http://www.w3.org/2000/svg">
                                <polygon points="0,75 40,0 40,75" fill="#000000"></polygon>
                            </svg>
                            <div className="center bottom header__line--katowice"></div>
                            {/*<button className="bring-to-top down" onClick={this.props.onScrollUp}></button>*/}
                            {/*<button className="bring-to-top up" onClick={this.props.onScrollDown}></button>*/}
                            <svg className="header__line--katowice line--bottom--katowice--right" width="40" height="75"
                                 xmlns="http://www.w3.org/2000/svg">
                                <polygon points="0,0 40,75 0,75" fill="#000000"></polygon>
                            </svg>
                            <svg className="header__line--katowice"
                                 style={{width: '40px', right: 0, top: '-18px', marginRight: '-10px', height: '80px'}}
                                 width="40" height="75" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="0,0 40,75 0,75" fill="#ffe200"></polygon>
                            </svg>
                        </div>
                    </div>
                </div>
            },
            displayOnVoteDone: function () {
                if(!this.props.voted) {
                    return null;
                }

                return  <div className="flex center center-items">
                    <div className="question-text big margin--vertical--big ui-text-align--center">
                        ZERKNIJ NA TELEBIM, ŻEBY ZOBACZYĆ, KTO JEST NAJLEPSZY!
                    </div>
                    
                    {!this.props.wait ?
                    <button onClick={this.props.restartVote}  className="button--gkskatowice"  id="oneMoreTime">
                        <div className="ui-position--relative padding--horizontal--medium padding--vertical--medium md-headline ui-text-align--center ">
                            ZAGŁOSUJ JESZCZE RAZ!
                        </div>
                    </button> : null}

                    {this.props.wait ?
                    <div id="voteInNextMinute" className="question-text ui-text-shadow ui-position--relative padding--horizontal--medium padding--vertical--medium md-headline ui-text-align--center">
                        ZAGŁOSUJ PONOWNIE PO UPŁYWIE MINUTY
                    </div> : null }
                    <a className="padding--vertical--medium" href="http://www.aasapolska.pl" target="_blank"><img src="/img/katowice/logo-lewe2big.png" /></a>
                </div>
            },
        displayWhenNotStarted: function () {
            if (!this.props.isNotStarted) {
                return null;
            }

            return <div className="flex center center-items">
                <div className="question-text big margin--vertical--big ui-text-align--center">
                    KONKURS JESZCZE SIĘ NIE ROZPOCZĄŁ
                </div>

                <a className="padding--vertical--medium" href="http://www.aasapolska.pl" target="_blank"><img
                    src="/img/katowice/logo-lewe2big.png"/></a>
            </div>
        },
        displayWhenFail: function () {
            if(!this.props.isFailed) {
                return null;
            }

            return <div className="flex center center-items">
                <div className="question-text big margin--vertical--big ui-text-align--center">
                    UPS... COŚ POSZŁO NIE TAK. ODŚWIEŻ STRONĘ I SPRÓBUJ JESZCZE RAZ.
                </div>

                <button onClick={this.props.restartVote}  className="button--gkskatowice"  id="oneMoreTime">
                    <div className="ui-position--relative padding--horizontal--medium padding--vertical--medium md-headline ui-text-align--center ">
                        ZAGŁOSUJ JESZCZE RAZ!
                    </div>
                </button>
            </div>
        },
            displayWhenFinished: function() {
                if(!this.props.isFinished) {
                    return null;
                }

                return  <div className="flex center center-items">
                    <div className="question-text big margin--vertical--big ui-text-align--center">
                        KONKURS ZOSTAŁ ZAKOŃCZONY <br/>
                        DZIĘKUJEMY ZA UDZIAŁ W ZABAWIE
                    </div>

                    <a className="padding--vertical--medium" href="http://www.aasapolska.pl" target="_blank"><img src="/img/katowice/logo-lewe2big.png" /></a>
                </div>
            },
            render: function () {
                return <div className="header--katowice-bg">
                    <div style={{height: '80px'}}>
                    </div>
                    <div className="ui-position--fixed bring-to-top-top ui--full-width" style={{top: 0}}>
                        <div className="header header--katowice-player fade flex center-items center">
                            <div style={{'zIndex': 7, paddingTop: '10px'}}
                                 className="ui--full-width flex row center-items center space-around flex-start">
                                <img src="/img/katowice/logo-lewe2.png"/>
                                <img src="/img/katowice/logo-srodek.png"/>
                                <img src="/img/katowice/logo_prawe.png"/>
                            </div>
                            <svg width="40" height="75" className="header__line--katowice left left-yellow"
                                 xmlns="http://www.w3.org/2000/svg">
                                <polygon points="0,0 40,0 40,75" fill="#ffe200"></polygon>
                            </svg>
                            <svg width="40" height="75" className="header__line--katowice left"
                                 xmlns="http://www.w3.org/2000/svg">
                                <polygon points="0,0 40,0 40,75"></polygon>
                            </svg>
                            <div className="center-x header__line--katowice"></div>
                            <div className="center-x center-yellow"></div>
                            <svg width="40" height="75" className="header__line--katowice right"
                                 xmlns="http://www.w3.org/2000/svg">
                                <polygon points="0,0 40,0 0,75"></polygon>
                            </svg>
                            <svg width="40" height="75" className="header__line--katowice right right-yellow"
                                 xmlns="http://www.w3.org/2000/svg">
                                <polygon points="0,0 40,0 0,75" fill="#ffe200"></polygon>
                            </svg>
                        </div>
                    </div>
                    {this.displayWhenNotStarted()}
                    {this.displayOnVote()}
                    {this.displayOnVoteDone()}
                    {this.displayWhenFinished()}
                    {this.displayWhenFail()}
                </div>;
            }
        });

    return Header;
});