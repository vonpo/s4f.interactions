define([
    'react',
    'classnames'], function (
        React,
        classnames) {

    var Header = React.createClass({
        render: function () {
            return <div className="header--katowice-bg">
                <div style={{height: '80px'}}>
                </div>
                <div className="ui-position--fixed ui--full-width" style={{top: 0, zIndex:5}}>
                    <div className="header header--katowice-player fade flex center-items center">
                        <div style={{'zIndex':7, paddingTop: '10px'}}  className="ui--full-width flex row center-items center space-around flex-start">
                            <img src="/img/katowice/logo-lewe2.png" />
                            <img src="/img/katowice/logo-srodek.png" />
                            <img src="/img/katowice/logo_prawe.png" />
                        </div>
                        <svg width="40" height="75" className="header__line--katowice left left-yellow" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,0 40,0 40,75" fill="#ffe200"></polygon>
                        </svg>
                        <svg width="40" height="75" className="header__line--katowice left"  xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,0 40,0 40,75"></polygon>
                        </svg>
                        <div className="center-x header__line--katowice"></div>
                        <div className="center-x center-yellow"></div>
                        <svg width="40" height="75" className="header__line--katowice right" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,0 40,0 0,75"></polygon>
                        </svg>
                        <svg width="40" height="75" className="header__line--katowice right right-yellow" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,0 40,0 0,75" fill="#ffe200"></polygon>
                        </svg>
                    </div>
                </div>
                <div className="question-text ui-position--relative padding--horizontal--small padding--vertical--medium ui-text-align--center">
                    WYBIERZ <img src="/img/katowice/aasa.png" /> MECZU
                </div>
                <div className="ui--full-width text--white flex center-items center">
                    <div style={{height:'56px'}} className="zgorzelec__up-down katowice ui-overflow--hidden ui--full-width fade ui-position--relative flex center-items center row">
                        <svg width="40" height="75" style={{width:'40px' , left:0, top:'-18px', marginLeft: '-10px', height:'80px'}} className="header__line--katowice" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,75 40,0 40,75" fill="#ffe200"></polygon>
                        </svg>
                        <div style={{position: 'absolute',height:'10px', background: '#ffe200',left: '20px', right:'20px',zIndex:2,top:0}}></div>
                        <svg className="header__line--katowice line--bottom--katowice--left" width="40" height="75" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,75 40,0 40,75" fill="#000000"></polygon>
                        </svg>
                        <div className="center bottom header__line--katowice"></div>
                        <button className="down"></button>
                        <button className="up"></button>
                        <svg className="header__line--katowice line--bottom--katowice--right" width="40" height="75" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,0 40,75 0,75" fill="#000000"></polygon>
                        </svg>
                        <svg className="header__line--katowice" style={{width:'40px',right:0,top: '-18px',marginRight: '-10px',height: '80px'}} width="40" height="75" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,0 40,75 0,75" fill="#ffe200"></polygon>
                        </svg>
                    </div>
                </div>
            </div>;
        }
    });

    return Header;
});