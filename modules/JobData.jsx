import React from 'react';

class JobData extends React.Component {

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Data</div>
        <div className="panel-body">
          <ul className = "list-group">
            {JSON.stringify(this.props.data.outputs,null,2)}
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
