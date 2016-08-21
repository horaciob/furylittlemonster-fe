import React from 'react';
import TimerMixin from 'react-timer-mixin';
import { Link } from 'react-router'

class TasksInfo extends React.Component {
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
  orderTasks(a,b){
    console.log(a);
    console.log(b);
    if (a.order < b.order){
      return -1;
    }
    if (a.order > b.order){
      return 1;
    }
    return 0;
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Tasks</div>
        <div className="panel-body">
          <ul className = "list-group">
            {this.props.tasksValues.sort(this.orderTasks).map((task) =>
              <li key = {task.id}  className = {this.statusFormatter(task.status)}>
                {task.name}
                <span className="badge">{task.retries}</span>
              </li>)}
            </ul>
          </div>
        </div>
      );
    }
  }
  TasksInfo.defaultProps = {
    tasksValues: []
  }

  export default TasksInfo;
