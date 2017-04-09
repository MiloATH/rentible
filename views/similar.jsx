var React = require('react');

class Similar extends React.Component {
  render() {
    return (
      <div>
        <li class="nearby">
          <a href='item/{this.props.data._id}'>
            <img src={this.props.data.image_url} title={this.props.data.title} width='182'/>
            <div class="neardescr">
              <div class="name">
                {this.props.data.title}
              </div>
              <div class="description">
                 {this.props.data.description}
              </div>
            </div>
          </a>
        </li>
      </div>
    )
  }
}
Similar.propTypes = {
  data: React.PropTypes.object
};

module.exports = Similar;
