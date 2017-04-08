var React = require('react');
var ItemGallery = require ('./itemGallery');
var CategoryMenu = require ('./categoryMenu');
var SignOn = require('./signon');

class Index extends React.Component {
  render() {
    return (
      <div>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/stylesheets/header.css" />
          <link rel="stylesheet" href="/stylesheets/homepage.css" />
          <script dangerouslySetInnerHTML={{__html:`
            // This is making use of ES6 template strings, which allow for
            // multiline strings. We specified "{jsx: {harmony: true}}" when
            // creating the engine in app.js to get this feature.
            console.log("hello world");
          `}}/>
        </head>
        <h1>
          {this.props.title}
        </h1>
        <p>Welcome to {this.props.title}</p>
        <SignOn />
        <CategoryMenu />
        <div id="bottomColor" />
        <div id="bottomCover" />
        <ItemGallery />
      </div>
    )
  }
}

Index.propTypes = {
  title: React.PropTypes.string
};

module.exports = Index;