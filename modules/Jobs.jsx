import React from 'react';
import TimerMixin from 'react-timer-mixin';
import { Link } from 'react-router'
import TasksInfo from './TasksInfo.jsx';
import CallbacksInfo from './CallbacksInfo.jsx';
import Worker from './Worker.jsx';
import JobData from './JobData.jsx';

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
            <div className="row">
              <div className="col-xs-12 col-md-8">
                <div className="panel panel-default">
                  <div className="panel-heading">Job Info</div>
                  <div className="panel-body">
                    <dl className="dl-horizontal">
                      <dt>Uuid:</dt>
                      <dd>{self.state.job.uuid}</dd>
                      <dt>Name:</dt>
                      <dd>{self.state.job.name}</dd>
                      <dt>id:</dt>
                      <dd>{self.state.job.id}</dd>
                      <dt>Namespace:</dt>
                      <dd>{self.state.job.namespace}</dd>
                      <dt>Status:</dt>
                      <dd>  <span className = {this.statusFormatter(self.state.job.status)}>
                        {self.state.job.status}
                      </span></dd>
                      <dt>Max retries:</dt>
                      <dd>{self.state.job.max_retries}</dd>
                      <dt>Created:</dt>
                      <dd>{self.state.job.created_at}</dd>
                      <dt>Updated:</dt>
                      <dd>{self.state.job.updated_at}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <TasksInfo tasksValues = {this.state.job.tasks}></TasksInfo>
              </div>
              <div className="col-md-4">
                <CallbacksInfo callbacksValues = {this.state.job.callbacks}></CallbacksInfo>
              </div>
              <div className="col-md-4">
                <JobData data = {this.state.job.data}></JobData>
              </div>
              <div className="col-md-4">
                <Worker workerValues = {this.state.job.worker}></Worker>
              </div>
            </div>
          </div>
        );
      }
    }

    export default Job;
    export default Jobs;
