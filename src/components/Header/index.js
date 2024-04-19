import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import Popup from 'reactjs-popup'
import {BsBrightnessHigh} from 'react-icons/bs'
import {IoMdMoon} from 'react-icons/io'

import WatchContext from '../../context/WatchContext'

import {Container} from './styledComponents'

const Header = props => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme, changeTheme} = value
      const bgColor = isDarkTheme ? '#231f20' : '#f1f5f9'
      const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
      const onClickTheme = () => {
        changeTheme()
      }

      const onClickLogout = () => {
        Cookie.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      return isDarkTheme ? (
        <Container bgColor={bgColor} textColor={textColor}>
          <nav className="nav-header">
            <Link to="/">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                alt="website logo"
              />
            </Link>
            {/* eslint-disable-next-line */}
            <button type="button" onClick={onClickTheme} data-testid="theme">
              <BsBrightnessHigh />
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <button type="button" className="logout-desktop-btn">
                  Logout
                </button>
              }
            >
              {close => (
                <>
                  <Container bgColor={bgColor}>
                    <p>Are you sure, you want to logout</p>
                    <div>
                      {/* eslint-disable-next-line */}
                      <button
                        type="button"
                        className="trigger-button"
                        data-testid="closeButton"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button type="button" onClick={onClickLogout}>
                        Confirm
                      </button>
                    </div>
                  </Container>
                </>
              )}
            </Popup>
          </nav>
        </Container>
      ) : (
        <Container bgColor={bgColor}>
          <nav className="nav-header">
            <Link to="/">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="website logo"
              />
            </Link>
            {/* eslint-disable-next-line */}
            <button type="button" onClick={onClickTheme} data-testid="theme">
              <IoMdMoon />
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <button type="button" className="logout-desktop-btn">
                  Logout
                </button>
              }
            >
              {close => (
                <>
                  <Container bgColor={bgColor}>
                    <p>Are you sure, you want to logout</p>
                    <div>
                      {/* eslint-disable-next-line */}
                      <button
                        type="button"
                        className="trigger-button"
                        data-testid="closeButton"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button type="button" onClick={onClickLogout}>
                        Confirm
                      </button>
                    </div>
                  </Container>
                </>
              )}
            </Popup>
          </nav>
        </Container>
      )
    }}
  </WatchContext.Consumer>
)
export default withRouter(Header)
