import React, { useContext, useState } from 'react'
import { AdminHeader } from '../../components/admin'
import { LiveBroadcastInfoDisplay } from '../../components'
import { GlobalStateContext } from '../../context/GlobalContextProvider'
import {
  updateMarqueeTitle,
  updateMarqueeGuests,
  submitMarquee,
  setDefaultMarquee,
} from '../../utils/'

/**
 * Renders the `/hmbk-admin/live-stream-info/` page with a form to update the live stream marquee.
 * @category Admin Page
 * @function AdminLiveStreamInfo
 * @returns {jsx}
 */
export default function AdminLiveStreamInfo() {
  const globalState = useContext(GlobalStateContext)

  const [liveTitle, setLiveTitle] = useState('')
  const [liveGuests, setLiveGuests] = useState('')

  return (
    <main className="black-bg-page">
      <AdminHeader renderHomeLink={true} />

      <div className="section container is-fluid">
        <div className="columns is-mobile">
          <div className="column is-12 content">
            <h2 className="title">Live Stream Info</h2>
            <p className="subtitle">Edit the details for a live stream.</p>
          </div>
        </div>

        <div className="columns is-multiline is-vcentered admin-box">
          <div className="column">
            <div className="content">
              <h3 className="title">Current Live Stream Info</h3>
            </div>
            <LiveBroadcastInfoDisplay
              liveTitle={globalState.liveMarquee.liveShowTitle}
              liveGuests={globalState.liveMarquee.liveShowGuests}
            />
          </div>
          <div className="column">
            <div className="content">
              <h3 className="title">Live Info Preview</h3>
            </div>
            {liveTitle || liveGuests ? (
              <LiveBroadcastInfoDisplay
                liveTitle={liveTitle}
                liveGuests={liveGuests}
              />
            ) : (
              <LiveBroadcastInfoDisplay
                liveTitle={'Start typing new live stream info'}
                liveGuests={'to preview it here!'}
              />
            )}
          </div>
        </div>

        <div className="section columns is-mobile">
          <div className="column is-12">
            <div className="content">
              <h3 className="title">Clearing Live Broadcast Info</h3>

              <p>
                If you clear the <b>Live Show Title</b> and{' '}
                <b>Live Show Guests</b> fields and hit the{' '}
                <b>Update Live Show Info</b> button, the default stream info
                will appear to prevent the Radio Player from displaying no info.
              </p>
            </div>
            <form>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Default Stream Info</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <LiveBroadcastInfoDisplay
                        liveTitle={'Halfmoon Presents'}
                        liveGuests={'Live Radio'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="section columns is-mobile">
          <div className="column is-12">
            <div className="content">
              <h3 className="title">Live Streaming Marquee</h3>
            </div>
            <form
              onSubmit={event => submitMarquee(event, liveTitle, liveGuests)}
            >
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Live Show Title</label>
                </div>

                <div className="field-body">
                  <div className="field">
                    <div className="control is-expanded">
                      <input
                        className="input is-rounded"
                        type="text"
                        name="marqueeInput"
                        placeholder="If this live show is titled, enter the title here..."
                        onChange={event =>
                          updateMarqueeTitle(event, setLiveTitle)
                        }
                        onSubmit={event =>
                          submitMarquee(event, liveTitle, liveGuests)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Live Show Guests</label>
                </div>

                <div className="field-body">
                  <div className="field">
                    <div className="control is-expanded">
                      <input
                        className="input is-rounded"
                        type="text"
                        name="marqueeInput"
                        placeholder="Enter the guests that are currently streaming..."
                        onChange={event =>
                          updateMarqueeGuests(event, setLiveGuests)
                        }
                        onSubmit={event =>
                          submitMarquee(event, liveTitle, liveGuests)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal" />

                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <button
                        className="button is-outlined is-rounded"
                        type="submit"
                        value="submit"
                      >
                        Update Live Show Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
