var React = require('react');
var Transportation = require('./transportation');
var Memes = require('./memes');
var Games = require('./games');

class Item extends React.Component {
  render() {
    return (
      <div>
        <div id="bullet">
          &#8226;
        </div>
        <Transportation />
        <Memes />
        <Games />
      </div>
    )
  }
}
CategoryMenu.propTypes = {

};

module.exports = CategoryMenu;