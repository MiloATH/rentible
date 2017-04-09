var React = require('react');
var Transportation = require('./transportation');
var Memes = require('./memes');
var Games = require('./games');

class CategoryMenu extends React.Component {
  render() {
    return (
      <div>
        <div id="categories">
          <ul>
            <Transportation />
            <Memes />
            <Games />
          </ul>
        </div>
      </div>
    )
  }
}
CategoryMenu.propTypes = {

};

module.exports = CategoryMenu;
