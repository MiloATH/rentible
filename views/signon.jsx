var React = require('react');

class SignOn extends React.Component {
  render() {
    return (
      <div>
        <button id="login">Login</button>
        <button id="signup">Sign Up</button>
      </div>
    )
  }
}
SignOn.propTypes = {

};

module.exports = SignOn;
