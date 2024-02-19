import appDataStore from '@/src/stores/appDataStore';
import { TSelectedImageDbEntry, deleteSelectedImageDbEntry } from '@/src/utils/firestoreUtils';
import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'manage-event-image-accordian',
})
export class ManageEventImageAccordian {
  @State() status: 'deleting' | 'deleted' | 'ready' | 'error' = 'ready';
  @Prop() selectedImageDbEntry!: TSelectedImageDbEntry;
  @State() showDeleteModal!: TSelectedImageDbEntry;

  render() {
    return (
      <rm-accordian
        heading={`${this.selectedImageDbEntry.createdAt} ${
          this.status === 'deleted' ? '[deleted]' : ''
        }`}
        color="neutral"
      >
        {this.status === 'deleting' && <div>deleting..</div>}
        {this.status === 'deleted' && <div></div>}
        {this.status === 'error' && <div>error: something went wrong</div>}
        {this.status === 'ready' && (
          <div>
            <img src={this.selectedImageDbEntry.downloadUrl} />
            <rm-modal-button buttonText="delete">
              <p class="py-4">Are you sure you want to delete this image?</p>
              <div class="modal-action">
                <rm-button
                  onClick={async () => {
                    this.status = 'deleting';
                    const response = await (async () => {
                      if (!appDataStore.state.uid) return { success: false } as const;

                      return deleteSelectedImageDbEntry({
                        id: this.selectedImageDbEntry.id,
                        userId: appDataStore.state.uid,
                      });
                    })();
                    this.status = response.success ? 'deleted' : 'error';
                  }}
                >
                  Confirm Delete
                </rm-button>
              </div>
            </rm-modal-button>
          </div>
        )}
      </rm-accordian>
    );
  }
}
