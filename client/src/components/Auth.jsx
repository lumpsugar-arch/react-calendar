import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import { apiPrefix } from '../../../config/config'
import { getJwt } from "./helpers/jwt";

class Auth extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push('/login')
    }

    axios.get(`${apiPrefix}/users/getUser`, { headers: { Authorization: `Bearer ${jwt}` }
    }).then(res => {
      if (this._isMounted) {
        this.setState({
          user: res.data
        });
      }
    }).catch(err => {
        localStorage.removeItem('user-token');
        this.props.history.push('/login')
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    if (this.state.user === undefined) {
      return (
        <div><h1>Loading...</h1></div>
      )
    }

    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default withRouter(Auth)