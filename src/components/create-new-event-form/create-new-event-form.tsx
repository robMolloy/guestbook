import { auth } from '@/src/config/firebase-config';
import { css } from '@/src/utils/cssUtils';
import { createEventDbEntryAndConfirm, eventDbEntrySchema } from '@/src/utils/firestoreUtils';
import { Component, Event, EventEmitter, State, h } from '@stencil/core';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

type TCreateEventSuccessEventEmitter = EventEmitter<z.infer<typeof eventDbEntrySchema>>;

@Component({
  tag: 'create-new-event-form',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class StartNewEventForm {
  @State() loading = false;
  @State() formErrorMessage = '';
  @State() eventName: string = '';
  @State() eventNameErrorMessage: string = '';
  @Event({ eventName: 'createEventSuccess' }) createEventSuccess!: TCreateEventSuccessEventEmitter;

  async onSubmit() {
    this.checkEventNameValid();
    const uid = auth.currentUser?.uid;

    if (!uid) return;
    if (this.loading) return;
    if (!!this.eventNameErrorMessage) return;
    this.loading = true;

    await (async () => {
      const newEvent = { id: uuid(), uid: uid, name: this.eventName };
      console.log({ newEvent });

      const createResponse = await createEventDbEntryAndConfirm(newEvent);

      if (!createResponse.success) return (this.formErrorMessage = createResponse.error.message);
      this.createEventSuccess?.emit(createResponse.data);
      console.log('success');
    })();

    this.loading = false;
  }

  checkEventNameValid() {
    try {
      const schema = z.string().min(7).max(20);
      const parseResponse = schema.safeParse(this.eventName);
      if (!parseResponse.success) throw new Error(parseResponse.error.issues?.[0].message);

      this.eventNameErrorMessage = '';
    } catch (e) {
      const error = e as { message: string };

      this.eventNameErrorMessage = error.message;
    }
  }

  render() {
    return (
      <form>
        {this.formErrorMessage && (
          <div style={css({ textAlign: 'center' })} class="bg-error">
            {this.formErrorMessage}
          </div>
        )}
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class={`label-text${this.eventNameErrorMessage ? ' bg-error' : ''}`}>
              {this.eventNameErrorMessage || 'Type the name of your new event'}
            </span>
          </div>
          <div style={css({ display: 'flex', gap: '10px' })}>
            <input
              type="text"
              style={css({ flex: '1' })}
              placeholder="event name"
              class={`input input-bordered input-info w-full${
                !this.eventNameErrorMessage || ' input-error'
              }`}
              onInput={e => {
                this.eventName = (e.target as HTMLInputElement).value;
                this.checkEventNameValid();
              }}
              value={this.eventName}
            />
            <span>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={e => {
                  e.preventDefault();
                  this.onSubmit();
                }}
              >
                Start
                {!this.loading && (
                  <svg
                    class="h-6 w-6 fill-current md:h-8 md:w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                  </svg>
                )}
                {!!this.loading && <span class="loading loading-spinner loading-md"></span>}
              </button>
            </span>
          </div>
        </label>
      </form>
    );
  }
}
