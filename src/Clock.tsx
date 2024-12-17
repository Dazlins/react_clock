import React from 'react';

function getRandomName(): string {
  const newRandomName = Date.now().toString().slice(-4);

  return `Clock-${newRandomName}`;
}

function getCurrentTime(): string {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const partOfDay = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours || 12;

  return `${hours}:${minutes}:${seconds} ${partOfDay}`;
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
    currentTime: getCurrentTime(),
    clockName: 'Clock-0',
  };

  componentDidMount(): void {
    this.timerId = window.setInterval(() => {
      this.setState({
        clockName: getRandomName(),
      });
    }, 3300);

    this.secondsId = window.setInterval(() => {
      const currentTime = getCurrentTime();

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
      console.log(
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
