import React from 'react';
import TimerMixin from 'react-timer-mixin';
import { Link } from 'react-router'

class CallbacksInfo extends React.Component {
  statusFormatter(status_name){
    var statusStyles = {
      "success":"list-group-item list-group-item-success",
      "error":"list-group-item list-group-item-danger",
      "cancel":"list-group-item list-group-item-warning",
      "pending":"list-group-item",
      "running":"list-group-item list-group-item-info",
    }
    return statusStyles[status_name]
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Callbacks</div>
        <div className="panel-body">
          <ul className = "list-group">
            {this.props.callbacksValues.sort(this.callbacksValues).map((callback) =>
              <li key = {callback.id}  className = {this.statusFormatter(callback.status)}>
                {callback.name}
              </li>)}
            </ul>
          </div>
        </div>
      );
    }
  }
  CallbacksInfo.defaultProps = {
    callbacksValues: []
  }

  export default CallbacksInfo;
