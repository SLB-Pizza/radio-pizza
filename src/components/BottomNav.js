import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'
import { OutsideClick } from './index'

/**
 * Returns the layout for the BottomNav.
 * @category Site Element
 * @function BottomNav
 * @returns {jsx}
 */
function BottomNav() {
  const [dropUpOpen, setDropUpOpen] = useState(false)
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  const closeDropUp = () => setDropUpOpen(false)

  const toggleDropUp = () => setDropUpOpen(state => !state)

  const closeNavMenu = async () => await dispatch({ type: 'CLOSE_NAVMENU' })

  const toggleNavMenu = async () => await dispatch({ type: 'TOGGLE_NAVMENU' })

  const clearMixSearchTags = async () =>
    await dispatch({ type: 'CLEAR_MIX_SEARCH_TAGS' })

  /**
   * This globalState null return prevents ERROR #95313.
   * @see {@link TopNav Related globalState situation in TopNav}
   * @see {@link https://github.com/gatsbyjs/gatsby/issues/24264#issuecomment-631995753 Re: ERROR #95313 - To stop the error immediately, add a null check for the object}
   */
  if (!globalState) return null
  return (
    <nav
      className="navbar is-fixed-bottom"
      role="navigation"
      aria-label="navigation bar"
      id="navigation"
    >
      <OutsideClick
        id={'navigation'}
        onClick={() => {
          closeNavMenu()
          closeDropUp()
        }}
      >
        <div className="navbar-brand">
          <Link
            to="/"
            className="navbar-item"
            onClick={() => {
              closeNavMenu()
              clearMixSearchTags()
            }}
          >
            Ears to the concrete.
          </Link>

          <span
            className={
              globalState.navMenuOpen
                ? 'navbar-burger is-active'
                : 'navbar-burger'
            }
            role="button"
            aria-label="navigation menu"
            aria-expanded={globalState.navMenuOpen ? 'true' : 'false'}
            data-target="nav-menu"
            onClick={() => toggleNavMenu()}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>
        <div
          className={
            globalState.navMenuOpen ? 'navbar-menu is-active' : 'navbar-menu'
          }
          id="nav-menu"
        >
          <div className="navbar-start">
            <Link
              to="/radio"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
            >
              Radio
            </Link>
            <Link
              to="/schedule"
              className="navbar-item"
              onClick={() => {
                toggleNavMenu()
                clearMixSearchTags()
              }}
            >
              Schedule
            </Link>
            <Link
              to="/residents"
              className="navbar-item"
              onClick={() => {
                toggleNavMenu()
                clearMixSearchTags()
              }}
            >
              Residents
            </Link>

            {/* <div
              className={
                dropUpOpen
                  ? 'navbar-item has-dropdown has-dropdown-up is-active'
                  : 'navbar-item has-dropdown has-dropdown-up'
              }
            >
              <a className="navbar-item" onClick={() => toggleDropUp()}>
                Music
              </a>
              <div className="navbar-dropdown">
                <Link
                  to="/mixes"
                  className="navbar-item"
                  onClick={() => toggleNavMenu()}
                >
                  Radio
                </Link>

                <Link
                  to="/collections"
                  className="navbar-item"
                  onClick={() => toggleNavMenu()}
                >
                  Collections
                </Link>
              </div>
            </div> */}

            <Link
              to="/events"
              className="navbar-item"
              onClick={() => {
                toggleNavMenu()
                clearMixSearchTags()
              }}
            >
              Events
            </Link>
            <Link
              to="/editorial"
              className="navbar-item"
              onClick={() => {
                toggleNavMenu()
                clearMixSearchTags()
              }}
            >
              Editorial
            </Link>
            <a
              href="https://halfmoonbk.myshopify.com/"
              className="navbar-item"
              onClick={() => {
                toggleNavMenu()
                clearMixSearchTags()
              }}
              aria-label="Halfmoon Shop"
              target="_blank"
              rel="noopener"
            >
              Shop
            </a>
            <Link
              to="/about"
              className="navbar-item"
              onClick={() => {
                toggleNavMenu()
                clearMixSearchTags()
              }}
            >
              About
            </Link>
          </div>
          <div className="navbar-end is-hidden-touch">
            <a
              href="https://www.mixcloud.com/HalfMoonbk/"
              className="navbar-item"
              onClick={() => {
                toggleNavMenu()
              }}
              aria-label="Halfmoon on Mixcloud"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <Icon icon={['fab', 'mixcloud']} size="lg" />
              </span>
            </a>
            <a
              href="https://www.facebook.com/halfmoonbk/"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Facebook"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <Icon icon={['fab', 'facebook-square']} size="lg" />
              </span>
            </a>
            <a
              href="https://www.instagram.com/halfmoonbk/"
              className="navbar-item"
              onClick={() => {
                toggleNavMenu()
              }}
              aria-label="Halfmoon on Instagram"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <Icon icon={['fab', 'instagram']} size="lg" />
              </span>
            </a>
            <a
              href="https://twitter.com/halfmoonbk"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Twitter"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <Icon icon={['fab', 'twitter']} size="lg" />
              </span>
            </a>
          </div>
          <hr className="navbar-divider"></hr>
          <div className="navbar-end is-hidden-desktop">
            <a
              href="https://www.mixcloud.com/HalfMoonbk/"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Mixcloud"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <Icon icon={['fab', 'mixcloud']} size="lg" />
              </span>
            </a>
            <a
              href="https://www.facebook.com/halfmoonbk/"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Facebook"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <Icon icon={['fab', 'facebook-square']} size="lg" />
              </span>
            </a>
            <a
              href="https://twitter.com/halfmoonbk"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Twitter"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <Icon icon={['fab', 'twitter']} size="lg" />
              </span>
            </a>
            <a
              href="https://www.instagram.com/halfmoonbk/"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Instagram"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <Icon icon={['fab', 'instagram']} size="lg" />
              </span>
            </a>
          </div>
        </div>
      </OutsideClick>
    </nav>
  )
}

export default BottomNav
