import React, { Component } from 'react'
import { TouchableHighlight, View, Text, TextInput, StyleSheet } from 'react-native'
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}


function IssueRow(props) {
  const issue = props.issue;
  return (
    <View style={StyleSheet.container}>
    <Row data={[issue.id,issue.customerName,issue.phoneNum,issue.toDateString]}/>
    </View>
  );
}

function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );

  return (
    <View style={styles.container}>
        <Table borderstyle = {{borderColor: 'black'}}>
            <Row data={['ID','Customer Name','Phone Number',"Time Stamp"}, style={styles.headstyle} />
            {issueRows}
        </Table>
    </View>
  );
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    //this.createIssue = this.createIssue.bind(this);
    //this.deleteIssue = this.deleteIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      issueList {
        id customerName phoneNum
        created
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  async deleteIssue(issue) {
    const query = `mutation issueDelete($issue: IssueInputs!) {
      issueDelete(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Text>WaitList</Text>
        <IssueTable issues={this.state.issues} />
      </React.Fragment>
    );
  }
}



const styles = StyleSheet.create({
    container: { 
      flex: 1,
      padding: 18,
      paddingTop: 35,
      backgroundColor: '#ffffff' 
    },
    HeadStyle: { 
      height: 50,
      alignContent: "center",
      backgroundColor: '#ffe0f0'
    },
    TableText: { 
      margin: 10
    }
  });



