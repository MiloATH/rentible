var React = require('react');
var Layout = require('./layout');
var ItemGallery = require ('./itemGallery');
var CategoryMenu = require ('./categoryMenu');
var SignOn = require('./signon');

class Index extends React.Component {
  render() {
    return (
      <Layout title={this.props.title}>
        <h1>
          {this.props.title}
        </h1>
        <p>Welcome to {this.props.title}</p>
        <SignOn />
        <CategoryMenu />
        <div id="bottomColor" />
        <div id="bottomCover" />
        <ItemGallery />
      </Layout>
    );
  }
}

Index.propTypes = {
  title: React.PropTypes.string
};

module.exports = Index;