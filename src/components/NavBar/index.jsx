import React, { Component } from 'react';
import './navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-scroll';

const TOGGLE_HEIGHT = 200;

class NavBar extends Component {
  state = {
    scrolled: false,
    showMenu: false,
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const { scrolled } = this.state;
      if (window.scrollY > TOGGLE_HEIGHT && !scrolled) {
        this.setState({ scrolled: true });
      } else if (window.scrollY <= TOGGLE_HEIGHT && scrolled) {
        this.setState({ scrolled: false });
      }
    });
  }

  toggleMenu = () => {
    const { showMenu } = this.state;
    if (showMenu) this.setState({ showMenu: false });
    else this.setState({ showMenu: true });
  }

  render() {
    const { scrolled, showMenu } = this.state;
    const navLinks = [
      {
        name: 'Home',
        to: 'home-anchor',
      },
      {
        name: 'About',
        to: 'about-anchor',
      },
      {
        name: 'Services',
        to: 'services-anchor',
      },
      {
        name: 'Contacts',
        to: 'contacts-anchor',
      },
    ];

    return (
      <div className="navigation-bar">
        <div className="wrapper">
          <header>
            <nav className={`${scrolled ? 'black-nav' : ''}`}>
              <div className="menu-icon">
                <button type="button" className="iconButton" onClick={this.toggleMenu}>
                  <FontAwesomeIcon className="white" icon={faBars} />
                </button>
              </div>
              <div className="logo">
                <span className="thin">TEENS</span>
                <span className="bold">CAPS</span>
              </div>
              <div className="menu">
                <ul className={`${showMenu ? 'showing' : ''}`}>
                  {navLinks.map((link, index) => (
                    <li key={String(index)}>
                      <Link
                        activeClass="active-nav-link"
                        to={link.to}
                        spy
                        smooth
                        duration={500}
                        offset={-40}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </header>
        </div>
      </div>
    );
  }
}

export default NavBar;
