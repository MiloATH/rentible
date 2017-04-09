var React = require('react');

class ItemProfile extends React.Component {
  render() {
    return (
      <div>
        <div id="bottom">
          <div id="itemImg">
            <img title={this.props.datum.title} src={this.props.datum.image_url} />
          </div>
          <div id="info">
            <div>
              <h1>{this.props.datum.title}</h1>
              <h2>{this.props.datum.ownerId}</h2>
              <div id="maindescr">{this.props.datum.description}</div>
            </div>
            <div id="buyholder">
              <div id="buy">
                <div id="price">
                  {this.props.datum.price}
                </div>
                <div>
                  {this.props.datum.perTime}
                </div>
                <button id="buyBtn" onclick="(function(){document.getElementById('meme').style.display = 'block';})()">Rent</button>
              </div>
            </div>
          </div>
        </div>
        <div id="meme">
          <form action="/api/offer">
            <h1>Confirmation</h1>
            <h2>Are you sure you want to rent {this.props.title} from seller {this.props.datum.ownerId} for <input name="days" value="" type="text" style={{width: '30px', padding:'5px'}} /> days?</h2>
            <input name="id" value={this.props.datum._id} type="hidden" />
            <input type="submit" value="Yes" style={{display:'inline-block'}} />
          </form>
          <button style={{display: 'inline-block'}} id="no" onclick="(function(){document.getElementById('meme').style.display = 'none';})()">No</button>
        </div>
      </div>
    );
  }
}

ItemProfile.propTypes = {
  datum: React.PropTypes.object
};

module.exports = ItemProfile;
