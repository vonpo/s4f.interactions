define(['react',
    'classnames'], function(React, classnames) {
    return React.createClass({
        render: function () {
            var footer = classnames('footer ui-position--fixed bring-to-top', {
                hidden: !this.props.anchoredToTop && !this.props.anchoredToBottom
            });

            return  <div className={footer}>
                <div className="zgorzelec-gradient"></div>
                <div className="flex row center-items space-between padding--vertical--medium">
                    <img className="padding--horizontal--big" src="/img/zgorzelec/logo_s4f.png" />
                    <img className="padding--horizontal--big" src="/img/zgorzelec/logo_turow.png" />
                </div>
            </div>
        }
    })
});