define(['react',
    'classnames'], function(React, classnames) {
    return React.createClass({
        componentWillReceiveProps: function(nextProps) {
          if(nextProps.anchoredToTop === false && this.props.anchoredToTop) {
              //console.info('do it', this.getDOMNode())
          }
        },
        render: function () {
            var footer = classnames('footer--katowice ui-position--fixed bring-to-top', {
                hidden: !this.props.anchoredToTop && !this.props.anchoredToBottom
            });

            return  <div className={footer}>
                <div className="gradient"></div>
                <div className="flex row center center-items">
                    <img src="/img/katowice/s4f-logo.png" />
                </div>
            </div>
        }
    })
});