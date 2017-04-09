var React = require('react');

class ItemProfile extends React.Component {
  render() {
    return (
      <div>
        <div id="bottom">
          <div id="itemImg">
            <img title={this.props.title} src="" />
          </div>
          <div id="info">
            <div>
              <h1>{this.props.title}</h1>
              <h2>{this.props.ownerId}</h2>
              <div id="maindescr">{this.props.description}</div>
            </div>
            <div id="buyholder">
              <div id="buy">
                <div id="price">
                  {this.props.price}
                </div>
                <div>
                  {this.props.perTime}
                </div>
                <button id="buyBtn" onclick="(function(){document.getElementById('meme').style.display = 'block';})()">Rent</button>
              </div>
            </div>
          </div>
        </div>
        <div id="meme">
          <form action="/api/offer">
            <h1>Confirmation</h1>
            <h2>Are you sure you want to rent {this.props.title} from seller {this.props.ownerId} for <input name="days" value="" type="text" style="width:30px;padding:5px" /> days?</h2>
            <input name="id" value={this.props._id} type="hidden" /> 
            <input type="submit" value="Yes" style="display:inline-block;" /> 
          </form>
          <button style="display:inline-block" id="no" onclick="(function(){document.getElementById('meme').style.display = 'none';})()">No</button> 
        </div>
      </div>
    );
  }
}

ItemProfile.propTypes = {
  title: React.PropTypes.string,
  ownerId: React.PropTypes.string,
  description: React.PropTypes.string,
  price: React.PropTypes.string,
  perTime: React.PropTypes.string,
  itemId: React.PropTypes.string
};

module.exports = ItemProfile;