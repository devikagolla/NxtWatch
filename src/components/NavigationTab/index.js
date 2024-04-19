import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {HiFire} from 'react-icons/hi'
import WatchContext from '../../context/WatchContext'

import {Container} from './styledComponents'

const NavigationTab = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme, changeTab, activeTab} = value
      const bgColor = isDarkTheme ? '#231f20' : '#f1f5f9'
      // const activebg = isDarkTheme ? '#475569' : '#cbd5e1'
      const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
      const onClickHomeTab = () => {
        changeTab('Home')
      }

      const onClickTrendTab = () => {
        changeTab('Trending')
      }

      const onClickGameTab = () => {
        changeTab('Gaming')
      }

      const onClickSaveTab = () => {
        changeTab('Saved')
      }

      return (
        <Container bgColor={bgColor} textColor={textColor}>
          <ul className="nav-menu">
            <Link className="nav-link" to="/">
              <li key="home" onClick={onClickHomeTab}>
                <AiFillHome
                  size={30}
                  color={activeTab === 'Home' ? '#ffob37' : '#909090'}
                />
                <p>Home</p>
              </li>
            </Link>
            <Link className="nav-link" to="/trending">
              <li key="home" onClick={onClickTrendTab}>
                <HiFire
                  size={30}
                  color={activeTab === 'Trending' ? '#ffob37' : '#909090'}
                />
                <p>Trending</p>
              </li>
            </Link>
            <Link className="nav-link" to="/gaming">
              <li key="home" onClick={onClickGameTab}>
                <SiYoutubegaming
                  size={30}
                  color={activeTab === 'Gaming' ? '#ffob37' : '#909090'}
                />
                <p>Gaming</p>
              </li>
            </Link>
            <Link className="nav-link" to="/saved-videos">
              <li key="home" onClick={onClickSaveTab}>
                <MdPlaylistAdd
                  size={30}
                  color={activeTab === 'Saved' ? '#ffob37' : '#909090'}
                />
                <p>Saved videos</p>
              </li>
            </Link>
          </ul>
          <div>
            <p>CONTACT US</p>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </Container>
      )
    }}
  </WatchContext.Consumer>
)
export default NavigationTab
