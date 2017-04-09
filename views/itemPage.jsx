var React = require('react');
var Layout = require('./layout');
var Header = require('./header');
var SimilarMenu = require('./similarMenu');
var ItemProfile = require('./itemProfile');

class ItemPage extends React.Component {
  render() {
    return (
      <Layout title={this.props.title}>
        <Header />
        <SimilarMenu />
        <div id="bottomColor"></div>
        <div id="bottomCover"></div>
        <ItemProfile />
      </Layout>
    );
  }
}

ItemPage.propTypes = {
  title: React.PropTypes.string
};

module.exports = ItemPage;