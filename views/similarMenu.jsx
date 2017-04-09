var React = require('react');
var Similar = require('./similar');

class SimilarMenu extends React.Component {
  render() {
    return (
      <div>
        <div id="categories">
          <div id="bullet">
            Similar
          </div>
          <ul>
            <Similar data={this.props.datum1}/>
            <Similar data={this.props.datum2}/>
            <Similar data={this.props.datum3}/>
          </ul>
        </div>
      </div>
    )
  }
}
SimilarMenu.propTypes = {
  datum1: React.PropTypes.object,
  datum2: React.PropTypes.object,
  datum3: React.PropTypes.object
};

module.exports = SimilarMenu;
