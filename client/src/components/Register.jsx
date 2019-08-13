import React from 'react'
import axios from 'axios'

import {apiPrefix} from "../../../config/config";
import {Link} from "react-router-dom";

import '../less/form.less'

export default class Register extends React.Component {
  constructor(props) {
    super(props)

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      username: '',
      password: '',
      error: ''
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
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

    axios.post(`${apiPrefix}/users/register`, user)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            error: res.data[0].msg
          })
        }
        if (res.status === 201) {
          this.props.history.push('/login')
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const hidden = this.state.error ? '' : 'hidden';
    return (
      <div className='form-wrapper'>
        <form onSubmit={this.onSubmit} className='form form--center'>
          <h1 className='form__header'>Calendar App - Registration</h1>

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
            <label className='form__label' htmlFor="email">Username: </label>
            <input
              className='form__input-text'
              type="text"
              required
              onChange={this.onChangeUsername}
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
              value='Register'
            />
          </div>

          <div className='form__footer'>
            <span>Already have an account? <Link to='/login'>Log in</Link></span>
          </div>
        </form>
      </div>
    )
  }
}