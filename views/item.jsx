var React = require('react');

class Item extends React.Component {
  render() {
    return (
      <div style={{display: 'inline-block'}}>
        <li style={{margin: '10px', borderColor: '#dfdfdf', border: 'solid'}}>
          <img src="./images/item-200.png" />
          <div class="neardescr">
            <div class="name">
              {this.props.datum.title}
            </div>
            <div class="description">
              {this.props.datum.description}
            </div>
          </div>
        </li>
      </div>
    )
  }
}

Item.propTypes = {
  datum: React.PropTypes.object
};

module.exports = Item;