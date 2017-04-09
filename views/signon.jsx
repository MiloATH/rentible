var React = require('react');

class SignOn extends React.Component {
  render() {
    return (
      <div>
        <a href="/login"><button id="login">Login</button></a>
        <a href="/register"><button id="signup">Sign Up</button></a>
      </div>
    )
  }
}
SignOn.propTypes = {

};

module.exports = SignOn;
