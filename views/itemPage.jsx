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
        <ItemProfile datum={this.props.datum}/>
      </Layout>
    );
  }
}

ItemPage.propTypes = {
  title: React.PropTypes.string,
  datum: React.PropTypes.object
};

module.exports = ItemPage;
