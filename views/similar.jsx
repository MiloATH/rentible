var React = require('react');

class Similar extends React.Component {
  render() {
    return (
      <div>
        <li class="nearby">
          <a href="item/{{ ID }}">
            <img src="whatev" title="{{ ITEM_NAME }}" />
            <div class="neardescr">
              <div class="name">
                ## ITEM_NAME ##
              </div>
              <div class="description">
                 ## ITEM_DESCRIPTION ##
              </div>
            </div>
          </a>
        </li>
      </div>
    )
  }
}
Similar.propTypes = {
};

module.exports = Similar;
