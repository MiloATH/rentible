var React = require('react');
var Layout = require('./layout');
var Header = require('./header');

class LoginPage extends React.Component {
  render() {
    return (
      <Layout title={this.props.title}>
        <Header />
        <div id="loginbox">
          <h1>Login</h1>
          <form action="/login" method="post">
            <h2> Username </h2>
            <input type="text" name="username" /><br />
            <h2> Password </h2>
            <input type="password" name="password" /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </Layout>
    );
  }
}

LoginPage.propTypes = {
  title: React.PropTypes.string
};

module.exports = LoginPage;