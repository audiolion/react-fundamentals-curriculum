import React from 'react';

var styles = {
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    fontSize: '55px'
  },
  content: {
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    marginTop: '90px'
  }
}

export default class Loading extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    speed: React.PropTypes.number,
  };

  static defaultProps = {
    text: 'Loading',
    speed: 300
  };

  state = {
    originalText: this.props.text,
    text: this.props.text
  };

  componentDidMount() {
    const stopper = this.state.originalText + '...';
    this.interval = setInterval(function() {
      if (this.state.text === stopper) {
        this.setState({ text: this.state.originalText })
      } else {
        this.setState({ text: this.state.text + '.' })
      }
    }.bind(this), this.props.speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div style={styles.container}>
        <p style={styles.content}>{this.state.text}</p>
      </div>
    );
  }
}
