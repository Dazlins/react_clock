import React from 'react';
import './App.scss';
import { Clock } from './Clock';

type State = {
  hasClock: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    hasClock: true,
  };

  onRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  onLeftClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: true });
  };

  componentDidMount(): void {
    document.addEventListener('contextmenu', this.onRightClick);
    document.addEventListener('click', this.onLeftClick);
  }

  componentWillUnmount(): void {
    document.removeEventListener('contextmenu', this.onRightClick);
    document.removeEventListener('click', this.onLeftClick);
  }

  render() {
    const { hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
          <Clock onHide={() => this.setState({ hasClock: false })} />
        )}
      </div>
    );
  }
}
