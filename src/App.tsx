import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  currentTime: string;
  click: EventTarget | null;
  hasClock: boolean;
  clockName: string;
};

export class App extends React.Component<{}, State> {
  timerId: number | undefined;

  secondsId: number | undefined;

  state: State = {
    currentTime: new Date().toISOString().slice(11, 19),
    click: null,
    hasClock: true,
    clockName: 'Clock-0',
  };

  onRightClick = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({
      hasClock: false,
    });
  };

  onLeftClick = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({
      hasClock: true,
      currentTime: new Date().toISOString().slice(11, 19),
    });
  };

  componentDidMount(): void {
    this.timerId = window.setInterval(() => {
      this.setState({
        clockName: getRandomName(),
      });
    }, 3300);

    this.secondsId = window.setInterval(() => {
      const currentTime = new Date().toISOString().slice(11, 19);

      this.setState({ currentTime });

      if (this.state.hasClock) {
        // eslint-disable-next-line no-console
        console.log(currentTime);
      }
    }, 1000);

    document.addEventListener('contextmenu', this.onRightClick);
    document.addEventListener('click', this.onLeftClick);
  }

  componentWillUnmount(): void {
    document.removeEventListener('contextmenu', this.onRightClick);
    document.removeEventListener('click', this.onLeftClick);

    if (this.timerId) {
      window.clearInterval(this.timerId);
    }

    if (this.secondsId) {
      window.clearInterval(this.secondsId);
    }
  }

  componentDidUpdate(prevProps: {}, prevState: State): void {
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  render() {
    const { currentTime, hasClock, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
          <div className="Clock">
            <strong className="Clock__name">{clockName}</strong>
            {' time is '}
            <span className="Clock__time">{currentTime}</span>
          </div>
        )}
      </div>
    );
  }
}
