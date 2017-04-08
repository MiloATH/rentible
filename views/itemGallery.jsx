var React = require('react');
var Item = require('./item');

class ItemGallery extends React.Component {
  render() {
    return (
      <div>
        {/* a parameter needs to be passed for each item component */}
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    )
  }
}
ItemGallery.propTypes = {

};

module.exports = ItemGallery;