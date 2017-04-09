var React = require('react');
var Layout = require('./layout');
var Header = require('./header');
var StateMenu = require('./stateMenu');

class SignupPage extends React.Component {
  render() {
    return (
      <Layout title={this.props.title}>
        <Header />
        <div id="loginbox">
          <h1>Login</h1>
          <form action="/login" method="post">
            <h2> Username </h2>
            <input type="text" name="username" /><br />
            <h2> Email </h2>
            <input type="text" name="email" /><br />
            <h2> Street Number </h2> 
            <input type="text" name="street_number" /><br />
            <h2> Street Name </h2>
            <input type="text" name="street_name" /><br />
            <h2> City </h2>
            <input type="text" name="city" /><br />
            <h2> State </h2>
            <StateMenu />
            <h2> Zip Code </h2> 
            <input type="text" name="zip" /><br />            
            <h2> Password </h2>
            <input type="password" name="password" /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </Layout>
    );
  }
}

SignupPage.propTypes = {
  title: React.PropTypes.string
};

module.exports = SignupPage;