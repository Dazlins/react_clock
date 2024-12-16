import React from 'react';

function getRandomName(): string {
  const newRandomName = Date.now().toString().slice(-4);

  return `Clock-${newRandomName}`;
}

type ClockState = {
  currentTime: string;
  clockName: string;
};

type ClockProps = {
  onHide: () => void;
};

export class Clock extends React.Component<ClockProps, ClockState> {
  timerId: number | undefined;

  secondsId: number | undefined;

  state: ClockState = {
    currentTime: new Date().toUTCString().slice(-12, -4),
    clockName: 'Clock-0',
  };

  componentDidMount(): void {
    this.timerId = window.setInterval(() => {
      this.setState({
        clockName: getRandomName(),
      });
    }, 3300);

    this.secondsId = window.setInterval(() => {
      const currentTime = new Date().toUTCString().slice(-12, -4);

      this.setState({ currentTime });
      // eslint-disable-next-line no-console
      console.log(currentTime);
    }, 1000);
  }

  componentWillUnmount(): void {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }

    if (this.secondsId) {
      window.clearInterval(this.secondsId);
    }
  }

  componentDidUpdate(prevProps: ClockProps, prevState: ClockState): void {
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  render() {
    const { currentTime, clockName } = this.state;

    return (
      <div className="Clock">
        <strong className="Clock__name">{clockName}</strong>
        {' time is '}
        <span className="Clock_time">{currentTime}</span>
      </div>
    );
  }
}
