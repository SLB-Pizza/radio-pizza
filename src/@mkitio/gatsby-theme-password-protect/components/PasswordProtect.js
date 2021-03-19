import React, { useState } from 'react'
import { setSessionPassword } from '../utils/utils.js'
import { FallbackImage, IconMaker } from '../../../utils'

function PasswordProtect() {
  const [password, setPassword] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    /**
     * Write-only the password as cookie
     */
    setSessionPassword(password)
    window.location.reload()
  }

  return (
    <main className="full-height-page">
      <section className="hero is-password">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column password">
                <figure className="image is-128x128">
                  <FallbackImage />
                </figure>
                <form onSubmit={onSubmit}>
                  <div className="field has-addons">
                    <div className="control is-expanded has-icons-left">
                      <input
                        className="input is-medium is-rounded"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Ears to the concrete."
                      />
                      <IconMaker
                        spanClass={'icon is-medium is-left'}
                        iconSize={'1x'}
                        iconToUse={'lock'}
                        iconClass={'icon-color'}
                      />
                    </div>
                    <p className="control">
                      <button
                        className="button is-medium is-outlined is-rounded"
                        type="submit"
                      >
                        Welcome
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PasswordProtect
