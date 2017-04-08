var React = require('react');

class Item extends React.Component {
  render() {
    return (
      <div>
        <li class="nearby">
          <img src="whatev" title="{this.props.name}" />
          <div class="neardescr">
            <div class="name">
              {this.props.name}
            </div>
            <div class="description">
              {this.props.description}
            </div>
          </div>
        </li>
      </div>
    )
  }
}
Item.propTypes = {
  name: React.PropTypes.string,
  description: React.PropTypes.string
};

module.exports = Item;