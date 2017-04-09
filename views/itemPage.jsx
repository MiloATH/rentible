var React = require('react');
var Layout = require('./layout');
var Header = require('./header');
var SimilarMenu = require('./similarMenu');

class ItemPage extends React.Component {
  render() {
    return (
      <Layout title={this.props.title}>
        <Header />
        <SimilarMenu />
        <h1>
          {this.props.title}
        </h1>

      </Layout>
    );
  }
}

ItemPage.propTypes = {
  title: React.PropTypes.string
};

module.exports = ItemPage;