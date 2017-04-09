var React = require('react');

class Item extends React.Component {
  render() {
    return (
      <div style={{display: 'inline-block'}}>
        <a href={"/item/" + this.props.datum._id}>
          <li style={{margin: '10px', borderColor: '#dfdfdf', border: 'solid'}}>
            <img src={this.props.datum.image_url} height='300' width='320'/>
            <div class="neardescr">
              <div class="name">
                {this.props.datum.title}
              </div>
              <div class="description">
                {this.props.datum.description}
              </div>
            </div>
          </li>
        </a>
      </div>
    )
  }
}

Item.propTypes = {
  datum: React.PropTypes.object
};

module.exports = Item;
