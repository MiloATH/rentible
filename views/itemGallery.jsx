var React = require('react');
var Item = require('./item');

class ItemGallery extends React.Component {
  render() {

    const listItems = this.props.data.map((datum) =>
      <Item datum={datum} />
    );

    return (
      <div>
        <div id="bottom">
          <div id="itemlist">
            {/* a parameter needs to be passed for each item component */}
            <ul>
              {listItems}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ItemGallery.propTypes = {
  data: React.PropTypes.array
};

module.exports = ItemGallery;