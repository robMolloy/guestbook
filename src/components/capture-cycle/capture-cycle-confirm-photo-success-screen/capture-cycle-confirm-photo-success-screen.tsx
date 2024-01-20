import { Component, Event, h, State, EventEmitter } from '@stencil/core';
import { onCountdown } from '../../../utils/timeUtils';

@Component({
  tag: 'capture-cycle-confirm-photo-success-screen',
  styleUrl: '../../../styles/daisyUi.css',
  shadow: true,
})
export class RootComponent {
  @State() countdownInt: number | undefined = 60;
  @Event() goToCaptureCycleStatusPreReady?: EventEmitter;
  emitGoToCaptureCycleStatusPreReady = () => {
    if (!!this.goToCaptureCycleStatusPreReady) this.goToCaptureCycleStatusPreReady.emit();
  };

  componentDidLoad() {
    (async () => {
      await onCountdown({
        start: 60,
        stop: 0,
        onIncrement: (num: number) => (this.countdownInt = num),
        onComplete: () => (this.countdownInt = undefined),
      });
    })();
  }

  render() {
    return (
      <div
        style={{
          height: '90vh',
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>
          <custom-h1>Success</custom-h1>
          <custom-h2>your photo is printing, please wait...</custom-h2>

          <br />
          {this.countdownInt !== undefined && <custom-h1>{this.countdownInt}</custom-h1>}
          {this.countdownInt === undefined && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button
                  class="btn btn-primary"
                  onClick={() => {
                    this.emitGoToCaptureCycleStatusPreReady();
                  }}
                >
                  Start again
                </button>
              </div>
            </div>
          )}
        </span>
      </div>
    );
  }
}
