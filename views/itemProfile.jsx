var React = require('react');

class ItemProfile extends React.Component {
  render() {
    return (
      <div>
        <div id="bottom">
          <div id="info">
            <div>
              <h1>{this.props.datum.title}</h1>
              <div id="maindescr">{this.props.datum.description}</div>
            </div>
            <div id="buyholder" style={{textAlign: 'center'}}>
              <div id="buy">
                <div id="price" >
                  ${this.props.datum.price} /{this.props.datum.perTime}
                </div>
                <form action="/api/offer" method="post">
                  <input name="id" value={this.props.datum._id} type="hidden" />
                  <input type="submit" value="Rent" style={{display:'inline-block'}} />
                </form></div>
            </div>
          </div>
          <br />
          <br />

            <img title={this.props.datum.title} src={this.props.datum.image_url} style={{display: "block", margin: "auto", width:"70%"}} />
            <br/>
          <iframe style={{width: '70%'}} height='400' src={"https://www.google.com/maps/embed/v1/view?key=AIzaSyCN5uTcIXMJBUxjiUyUJmeTmJxmOnYkb20&zoom=15&center=" + this.props.datum.loc.coordinates[0] + ',' + this.props.datum.loc.coordinates[1]}></iframe>
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
