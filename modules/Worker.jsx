import React from 'react';


class Worker extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Worker</div>
        <div className="panel-body">
          <ul className = "list-group">
            <p><i><strong>host:</strong> {this.props.workerValues.host}</i></p>
            <p><i><strong>pid:</strong> {this.props.workerValues.pid}</i></p>
            <p><i><strong>Last Heartbeat:</strong> {this.props.workerValues.last_heartbeat}</i></p>
          </ul>
        </div>
      </div>
    );
  }
}
Worker.defaultProps = {
  workerValues: {
    id:0,
    pid:"",
    host:"",
    last_heartbeat:""
  }
}

export default Worker;
