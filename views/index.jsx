var React = require('react');
var Layout = require('./layout');
var ItemGallery = require ('./itemGallery');
var CategoryMenu = require ('./categoryMenu');
var Header = require ('./header');

class Index extends React.Component {
  render() {
    return (
      <div>
        <Layout title={this.props.title}>
          <Header />
          <CategoryMenu />
          <div id="bottomColor" />
          <div id="bottomCover" />
          <ItemGallery data={this.props.data} />
        </Layout>
      </div>
    )
  }
}

Index.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array
};

module.exports = Index;