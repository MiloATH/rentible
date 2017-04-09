var React = require('react');
var Similar = require('./similar');

class CategoryMenu extends React.Component {
  render() {
    return (
      <div>
        <div id="categories">
          <div id="bullet">
            Similar
          </div>
          <ul>
            <Similar />
            <Similar />
            <Similar />
          </ul>
        </div>
      </div>
    )
  }
}
SimilarMenu.propTypes = {

};

module.exports = SimilarMenu;
