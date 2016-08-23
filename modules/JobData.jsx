import React from 'react';
import JSONPretty from 'react-json-pretty';

class JobData extends React.Component {

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Data</div>
        <div className="panel-body">
          <ul className = "list-group">
            <JSONPretty id="json-pretty" json={this.props.data.outputs}></JSONPretty>
            </ul>
          </div>
        </div>
      );
    }
  }
  JobData.defaultProps = {
    data: {owner:{},outputs:{}}
  }

  export default JobData;
