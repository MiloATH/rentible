var React = require('react');

class Header extends React.Component {
  render() {
    return (
      <div id="header">
        <div id="titletext">
          <span style={{borderColor: "white", border: 'solid 4px', padding: '8px', marginTop: '4px'}}>
            <a href="/" style={{textDecoration: "none",color: "inherit"}}>Rentible</a>
          </span>
        </div>
        <div id="signon">
          <a href="/login"><button id="login">Login</button></a>
          <a href="/signup"><button id="signup">Sign Up</button></a>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
};

module.exports = Header;
