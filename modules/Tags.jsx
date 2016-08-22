import React from 'react';


class Tags extends React.Component {

  render() {
    return (
      <span>
        <ul className="list-inline">
          {this.props.tagsValues.map((tag) =>
            <li><span className="label label-primary">{Object.keys(tag)[0]}:{tag[Object.keys(tag)[0]]}</span></li>
          )}
        </ul>
      </span>
    );
  }
}
Tags.defaultProps = {
  tagsValues: []
}

export default Tags;
