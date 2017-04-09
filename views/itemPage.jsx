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
        <SimilarMenu datum1={this.props.similarData1} datum2={this.props.similarData2} datum3={this.props.similarData3}/>
        <div id="bottomColor"></div>
        <div id="bottomCover"></div>
        <ItemProfile datum={this.props.datum}/>
      </Layout>
    );
  }
}

ItemPage.propTypes = {
  title: React.PropTypes.string,
  datum: React.PropTypes.object,
  similarData1: React.PropTypes.object,
  similarData2: React.PropTypes.object,
  similarData3: React.PropTypes.object
};

module.exports = ItemPage;
