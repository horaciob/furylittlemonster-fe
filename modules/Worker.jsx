import React from 'react';
import TimerMixin from 'react-timer-mixin';
import { Link } from 'react-router'

class Worker extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Worker</div>
        <div className="panel-body">
          <ul className = "list-group">
            <p><i>host: {this.props.workerValues.host}</i></p>
            <p><i>pid: {this.props.workerValues.pid}</i></p>
            <p><i>Last Heartbeat: {this.props.workerValues.last_heartbeat}</i></p>
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
