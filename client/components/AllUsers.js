import React from 'react';
import axios from 'axios';
import SingleUser from './SingleUser';

class AllUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/users');
    this.setState({
      users: data
    });
  }

  render() {
    return (
      <div>
        <h1>All Users</h1>
        {this.state.users.map(user => <SingleUser key={user.id} user={user} />)}
      </div>
    );
  }
}

export default AllUsers;
