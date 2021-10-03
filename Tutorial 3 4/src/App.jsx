const initialIssues = [
    {
      id: 1, customerName: 'Ravan', phoneNumber: '12345678',
      created: new Date('2018-08-15'),
    },
    {
      id: 2, customerName: 'Eddie', phoneNumber: '87654321',
      created: new Date('2018-08-16'), 
    },
  ];
  
  class IssueFilter extends React.Component {
    render() {

      const freeSlots = 25 - this.props.issues.length
      return (
        <div>{freeSlots}</div>
      );
    }
  }
  
  class IssueRow extends React.Component {
    render() {
      const issue = this.props.issue;
      return (
        <tr>
          <td>{issue.id}</td>
          <td>{issue.customerName}</td>
          <td>{issue.phoneNumber}</td>
          <td>{issue.created.toDateString()}</td>
        </tr>
      );
    }
  }
  
  class IssueTable extends React.Component {
    render() {
      const issueRows = this.props.issues.map(issue =>
        <IssueRow key={issue.id} issue={issue} />
      );
  
      return (
        <table className="bordered-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Time Stamp</th>
            </tr>
          </thead>
          <tbody>
            {issueRows}
          </tbody>
        </table>
      );
    }
  }
  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.issueAdd;
      const issue = {
        customerName: form.customerName.value, phoneNumber: form.phoneNumber.value,
      }
      this.props.createIssue(issue);
      form.customerName.value = ""; form.phoneNumber.value = "";
    }
  
    render() {
      return (
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="customerName" placeholder="Customer Name" />
          <input type="text" name="phoneNumber" placeholder="Phone Number" />
          <button>Add</button>
        </form>
      );
    }
  }
  
  class IssueDelete extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.issueDelete;
      const issue = {
        id: form.id.value, customerName: form.customerName.value,
      }
      this.props.deleteIssue(issue);
      form.id.value = ""; form.customerName.value = "";
    }
  
    render() {
      return (
        <form name="issueDelete" onSubmit={this.handleSubmit}>
          <input type="number" name="id" placeholder="ID" />
          <input type="text" name="customerName" placeholder="Customer Name" />
          <button>Delete</button>
        </form>
      );
    }
  }


  class IssueList extends React.Component {
    constructor() {
      super();
      this.state = { issues: [] };
      this.createIssue = this.createIssue.bind(this);
      this.deleteIssue = this.deleteIssue.bind(this);
    }
  
    componentDidMount() {
      this.loadData();
    }
  
    loadData() {
      setTimeout(() => {
        this.setState({ issues: initialIssues });
      }, 500);
    }
  
    createIssue(issue) {
      issue.id = this.state.issues.length + 1;
      issue.created = new Date();
      const newIssueList = this.state.issues.slice();
      newIssueList.push(issue);
      this.setState({ issues: newIssueList });
    }
    
    deleteIssue(issue) {
      
      const deletedIssueList = this.state.issues.slice().filter(i=> i.id !=issue.id);
      this.setState({ issues: deletedIssueList});

    }
   
    render() {
      return (
        <React.Fragment>
          <h1>Waitlist</h1>
          <p>Current waiting list</p>
          <p>Add and delete entries below</p>
          <p>Free slots available on waitlist:</p>
          <IssueFilter issues={this.state.issues} />
          <hr />
          <p>Current entries in the system...</p>
          <IssueTable issues={this.state.issues} />
          <hr />
          <IssueAdd createIssue={this.createIssue} />
          <hr />
          <IssueDelete deleteIssue={this.deleteIssue} />
        </React.Fragment>
      );
    }
  }
  
  const element = <IssueList />;
  
  ReactDOM.render(element, document.getElementById('contents'));