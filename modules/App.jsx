import React from 'react';
import TimerMixin from 'react-timer-mixin';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Link } from 'react-router'

class App extends React.Component {
  render() {
    return (
      <Content></Content>
    );
  }
}

class Content extends React.Component {
  constructor() {
    super();
    self=this;
    self.state = {
      jobs: {"jobs":[]}
    };
    this.intervals = [];
    this.setJobs = this.setJobs.bind(this);
  };

  setJobs() {
    var self = this;
    fetch('http://lm.furycloud.io/jobs')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState({jobs: json})
    });
  }
  componentWillMount(){
    this.setJobs();
  }
  componentDidMount() {
    this.intervals.push(TimerMixin.setInterval(
      () => {
        this.setJobs()},5000));
      }
      componentWillUnmount() {
        this.intervals.forEach(clearInterval);
      }
      kibanaDashboard(job_id){
        var dash="http://fury.kibana4.melicloud.com/app/kibana#/dashboard/fury-little_monster-jobs?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-1h,mode:quick,to:now))&_a=(columns:!(_source),filters:!(),index:%5Bfury-conversions-notifier-%5DYYYY.MM.DD,interval:auto,options:(darkTheme:!f),panels:!((col:8,id:fury-little_monster-jobs-severity-by-job,panelIndex:1,row:4,size_x:5,size_y:3,type:visualization),(col:1,id:fury-little_monster-jobs-error_type-by-job,panelIndex:3,row:1,size_x:5,size_y:3,type:visualization),(col:8,id:fury-little_monster-jobs-status-by-job,panelIndex:4,row:7,size_x:5,size_y:3,type:visualization),(col:1,id:fury-little_monster-jobs-retries-by-job,panelIndex:5,row:7,size_x:5,size_y:3,type:visualization),(col:8,id:fury-little_monster-jobs-type-by-job,panelIndex:8,row:1,size_x:5,size_y:3,type:visualization),(col:6,id:fury-little_monster-jobs-finished-metric,panelIndex:9,row:1,size_x:2,size_y:3,type:visualization),(col:1,id:fury-little_monster-jobs-task-runned-by-job,panelIndex:10,row:4,size_x:5,size_y:3,type:visualization),(col:6,id:fury-little_monster-jobs-finished-success-metric,panelIndex:11,row:6,size_x:2,size_y:2,type:visualization),(col:6,id:fury-little_monster-jobs-finished-error-metric,panelIndex:12,row:4,size_x:2,size_y:2,type:visualization),(col:6,id:fury-little_monster-jobs-finished-cancelled-metric,panelIndex:13,row:8,size_x:2,size_y:2,type:visualization),(col:1,columns:!(message),id:fury-little_monster-jobs-search,panelIndex:14,row:10,size_x:12,size_y:5,sort:!(timestamp,desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:'tags.id:%20"+ job_id+ "')),sort:!(timestamp,desc),title:fury-little_monster-jobs,uiState:(P-1:(vis:(legendOpen:!t)),P-10:(vis:(legendOpen:!t)),P-12:(spy:(mode:(fill:!f,name:!n))),P-4:(spy:(mode:(fill:!f,name:!n)),vis:(legendOpen:!f)),P-5:(vis:(legendOpen:!f))))"
        return dash
      }
      statusFormatter(cell, row){
        var values={
          "success":"glyphicon glyphicon-ok",
          "error":"glyphicon glyphicon-remove",
          "pending":"glyphicon glyphicon-dashboard",
          "running":"glyphicon glyphicon-option-horizontal",
          "cancel":"glyphicon glyphicon-trash",
        }
        //return '"<i class=" + values[cell] + ">a</i>"';
        var job_id = row["id"];
        return "<a href=\"" +  self.kibanaDashboard(job_id) + "\" target=\"_blank\"><span class=\"" + values[cell] + "\"></span></a>";
      }
      idFormatter(cell, row){

        return <Link to={"/jobs/" + row["id"]} >{row["id"]}</Link>;
        }

        render() {
          return (
            <BootstrapTable data={this.state.jobs["jobs"]}  striped={true} search={true} hover={true} condensed={true}>
              <TableHeaderColumn dataField="id" isKey={true} dataFormat={self.idFormatter} dataSort={true}  headerAlign="center" dataAlign="center">Id</TableHeaderColumn>
              <TableHeaderColumn dataField="namespace" dataSort={true}  headerAlign="center">Namespace</TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort={true} headerAlign="center">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="uuid" dataSort={true} headerAlign="center">Uuid</TableHeaderColumn>
              <TableHeaderColumn dataField="status" dataSort={true} headerAlign="center" dataAlign="center" dataFormat={self.statusFormatter}>
                St.</TableHeaderColumn>
            </BootstrapTable>
          );
        }
      }

      export default Content;
      class Header extends React.Component {
        render() {
          return (
            <div>
              <h1>Littlemonster Jobs</h1>
            </div>
          );
        }
      }
      export default App;
