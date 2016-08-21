import React from 'react';
import TimerMixin from 'react-timer-mixin';
import { Link } from 'react-router'
import TasksInfo from './TasksInfo.jsx';
import CallbacksInfo from './CallbacksInfo.jsx';

class Jobs extends React.Component {
  render() {
    return (
      <Job job_id={this.props.params.job_id}></Job>
    );
  }
}

class Job extends React.Component {
  constructor() {
    super();
    self = this;
    self.state = {
      job: {}
    };
    this.intervals = [];
    this.setJob = this.setJob.bind(this);
  };

  setJob() {
    var self = this;
    fetch('http://lm.furycloud.io/jobs/' + this.props.job_id)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState({job: json})
    });
  }

  componentWillMount(){
    this.setJob();
  }
  componentDidMount() {
    this.intervals.push(TimerMixin.setInterval(
      () => {
        this.setJob()},5000));
      }
      componentWillUnmount() {
        this.intervals.forEach(clearInterval);
      }
      statusFormatter(status){
        var classes={
          "running":"label label-primary",
          "success":"label-success",
          "pending":"label label-default",
          "canceled":"label label-warning",
          "error":"label label-danger",
        }
        return classes[status];
      }
      render() {
        return (
          <div>
            <h3>{self.state.job.name}</h3>
            <div>{self.state.job.id}</div>
            <div>{self.state.job.namespace}</div>
            <span> Status:</span>
            <span className = {this.statusFormatter(self.state.job.status)}>
              {self.state.job.status}
            </span>
            <div>{self.state.job.max_retries}</div>
            <div>{self.state.job.created_at}</div>
            <div>{self.state.job.updated_at}</div>
            <div>{self.state.job.uuid}</div>
            <TasksInfo tasksValues = {this.state.job.tasks}></TasksInfo>
            <CallbacksInfo callbacksValues = {this.state.job.callbacks}></CallbacksInfo>
          </div>

        );
      }
    }

  export default Job;
  export default Jobs;
