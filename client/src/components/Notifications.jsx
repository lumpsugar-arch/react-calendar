import React from 'react'

import '../less/Notifications.less'

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      message: '',
      error: ''
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.messages.length > prevProps.messages.length) {
      let newMessage = this.props.messages[this.props.messages.length - 1];

      this.setState({
        message: newMessage
      });
      this.showNotification()
    }

    if (this.props.errors.length > prevProps.errors.length) {
      let newError = this.props.errors[this.props.errors.length - 1];

      this.setState({
        error: newError
      });
      this.showNotification()
    }
  }

  showNotification() {
    this.setState({
      isVisible: true
    });

    setTimeout(() => {
      this.setState({
        isVisible: false
      })
    }, 4000)
  }

  renderNotification() {
    if (this.state.error) return (
      <div className='notifications__errors'>
        {this.state.error}
      </div>
    );

    if (this.state.message) return (
      <div className='notifications__messages'>
        {this.state.message}
      </div>
    )
  }

  render() {
    const hidden = this.state.isVisible ? '' : 'notifications--hidden';

    return (
      <div className={`notifications ${hidden}`}>
        { this.renderNotification() }
      </div>
    )
  }
}