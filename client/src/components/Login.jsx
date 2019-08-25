import React from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

import '../less/form.less'

import { apiPrefix } from '../../../config/config'
import { getJwt } from "./helpers/jwt";


export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  componentDidMount() {
    const jwt = getJwt();
    axios.get(`${apiPrefix}/users/getUser`, { headers: { Authorization: `Bearer ${jwt}` }
    }).then(res => {
      if (res.data._id) {
        this.props.history.push('/')
      }
    }).catch(err => {
      console.log(err);
      localStorage.removeItem('user-token');
      this.props.history.push('login')
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }


  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };

    axios.post(`${apiPrefix}/users/login`, user)
      .then(res => {
        if (res.data.msg) {
          this.setState({
            error: res.data.msg
          })
        }
        if (res.data.token) {
          localStorage.setItem('user-token', res.data.token);
          this.props.history.push('/')
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const hidden = this.state.error ? '' : 'hidden';
    return (
      <div className='form-wrapper'>
        <form onSubmit={this.onSubmit} className='form form--center'>
          <h1 className='form__header'>Log in to calendar app</h1>

          <div className={`form__error-wrap ${hidden}`}>
            <span className='form__error'>{this.state.error}</span>
          </div>

          <div className='form__row'>
            <label className='form__label' htmlFor="email">Email: </label>
            <input
              className='form__input-text'
              type="email"
              required
              onChange={this.onChangeEmail}
            />
          </div>

          <div className='form__row'>
            <label className='form__label' htmlFor="password">Password: </label>
            <input
              className='form__input-text'
              type="password"
              required
              onChange={this.onChangePassword}
            />
          </div>

          <div className='form__submit-wrap'>
            <input
              className='button'
              type="submit"
              value='Log in'
            />
          </div>

          <div className='form__footer'>
            <span>Don't have an account yet? <Link to='/register'>Register</Link></span>
          </div>
        </form>
      </div>
    )
  }
}