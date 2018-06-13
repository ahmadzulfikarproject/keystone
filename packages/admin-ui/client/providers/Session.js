import { Component } from 'react';

function getJSON(url) {
  return fetch(url, {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    redirect: 'follow',
  }).then(response => response.json());
}

function postJSON(url, data = {}) {
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
  }).then(response => response.json());
}

class Session extends Component {
  state = {
    session: {},
    isLoading: true,
  };

  componentDidMount() {
    this.getSession();
  }

  getSession = () => {
    const { sessionPath } = this.props;
    // Avoid an extra re-render
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
    }
    getJSON(sessionPath).then(data => {
      this.setState({ session: data, isLoading: false });
    });
  };

  signOut = () => {
    const { signoutPath } = this.props;
    this.setState({ isLoading: true });
    postJSON(signoutPath)
      .then(() => this.getSession())
      .catch(error => console.error(error));
  };

  render() {
    const { signOut } = this;
    const { children } = this.props;
    const {
      session: { user, signedIn: isSignedIn },
      isLoading,
    } = this.state;

    return children({
      isLoading,
      isSignedIn,
      signOut,
      user,
    });
  }
}

export default Session;