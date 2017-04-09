var React = require('react');

class Header extends React.Component {
  render() {
    return (
      <div id="header">
        <div id="titletext">
          <span style={{borderColor: "white", border: 'solid 4px', padding: '8px', marginTop: '4px'}}>
            Rentible
          </span>
        </div>
        <div id="signon">
          <button id="login">Login</button>
          <button id="signup">Sign Up</button>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
};

module.exports = Header;