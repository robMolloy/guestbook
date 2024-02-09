import { css } from '@/src/utils/cssUtils';
import { getStreamSettings } from '@/src/utils/streamUtils';
import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'capture-cycle',
  styleUrl: '../../../styles/daisyUi.css',
  shadow: true,
})
export class CaptureCycle {
  @State() status: 'loading' | 'error' | 'success' = 'loading';
  @State() streamSettings?: {
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
  } = undefined;

  async componentDidLoad() {
    const streamSettings = await getStreamSettings({
      idealWidth: 1080,
      aspectRatio: 6 / 4,
    });
    if (streamSettings === undefined) return (this.status = 'error');
    console.log(streamSettings);

    this.streamSettings = streamSettings;
    this.status = 'success';
  }

  render() {
    if (this.status === 'loading') return <div>loading...</div>;
    if (this.status === 'error' || this.streamSettings === undefined) return <div>error...</div>;
    if (this.status === 'success')
      return (
        <Host style={css({ flex: '1', display: 'flex' })}>
          <dumb-capture-cycle streamSettings={this.streamSettings} />
        </Host>
      );
  }
}
