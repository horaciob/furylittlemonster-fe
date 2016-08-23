import React from 'react';


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

  taskDashboard(task_id, task_name){
    var dash = "http://fury.kibana4.melicloud.com/app/kibana#/dashboard/fury-little_monster-jobs?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-24h,mode:quick,to:now))&_a=(columns:!(_source),filters:!(),index:%5Bfury-conversions-notifier-%5DYYYY.MM.DD,interval:auto,options:(darkTheme:!f),panels:!((col:8,id:fury-little_monster-jobs-severity-by-job,panelIndex:1,row:4,size_x:5,size_y:3,type:visualization),(col:1,id:fury-little_monster-jobs-error_type-by-job,panelIndex:3,row:1,size_x:5,size_y:3,type:visualization),(col:8,id:fury-little_monster-jobs-status-by-job,panelIndex:4,row:7,size_x:5,size_y:3,type:visualization),(col:1,id:fury-little_monster-jobs-retries-by-job,panelIndex:5,row:7,size_x:5,size_y:3,type:visualization),(col:8,id:fury-little_monster-jobs-type-by-job,panelIndex:8,row:1,size_x:5,size_y:3,type:visualization),(col:6,id:fury-little_monster-jobs-finished-metric,panelIndex:9,row:1,size_x:2,size_y:3,type:visualization),(col:1,id:fury-little_monster-jobs-task-runned-by-job,panelIndex:10,row:4,size_x:5,size_y:3,type:visualization),(col:6,id:fury-little_monster-jobs-finished-success-metric,panelIndex:11,row:6,size_x:2,size_y:2,type:visualization),(col:6,id:fury-little_monster-jobs-finished-error-metric,panelIndex:12,row:4,size_x:2,size_y:2,type:visualization),(col:6,id:fury-little_monster-jobs-finished-cancelled-metric,panelIndex:13,row:8,size_x:2,size_y:2,type:visualization),(col:1,columns:!(message),id:fury-little_monster-jobs-search,panelIndex:14,row:10,size_x:12,size_y:5,sort:!(timestamp,desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:'tags.id:%20"+task_id+"%20AND%20tags.current_task:"+task_name+"')),sort:!(timestamp,desc),title:fury-little_monster-jobs,uiState:(P-1:(vis:(legendOpen:!t)),P-10:(vis:(legendOpen:!t)),P-12:(spy:(mode:(fill:!f,name:!n))),P-4:(spy:(mode:(fill:!f,name:!n)),vis:(legendOpen:!f)),P-5:(vis:(legendOpen:!f))))"
    return dash;
  }
  orderTasks(a,b){
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
              <a href={this.taskDashboard(this.props.jobId ,task.name)} target="_blank" key = {task.id}  className = {this.statusFormatter(task.status)}>
                {task.id} {task.name}
                <span className="badge">{task.retries}</span>
              </a>)}
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
