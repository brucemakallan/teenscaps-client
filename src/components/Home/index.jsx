import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { scrollSpy, Link } from 'react-scroll';
import NavBar from '../NavBar';
import Carousel from '../Carousel';
import getAllSections from '../../redux/actions/websiteSections';
import {
  endpoints, carousel, localFiles, about, contact,
  navLinks,
} from '../../common';
import './home.scss';
import PageLoader from '../PageLoader';
import About from '../About';
import Contacts from '../Contacts';
import ContactForm from '../ContactForm';

const style = { backgroundImage: `url(${localFiles.images.prismBackground})` };
const socialMediaPlatforms = [
  {
    name: 'Twitter',
    url: 'http://twitter.com',
    logo: localFiles.images.twitter
  },
  {
    name: 'Facebook',
    url: 'http://facebook.com',
    logo: localFiles.images.facebook
  },
  {
    name: 'Instagram',
    url: 'http://instagram.com',
    logo: localFiles.images.instagram
  },
];


class Home extends Component {
  async componentDidMount() {
    const { getAllSectionsDispatch } = this.props;
    await getAllSectionsDispatch(endpoints().articlesGetAll);
    scrollSpy.update();
  }

  render() {
    const { sections } = this.props;
    const carouselSection = sections.find(section => section.category === carousel);
    const aboutSection = sections.find(section => section.category === about);
    const contacts = sections.filter(section => section.category === contact);

    return (
      <div id="home-anchor" className="homepage">
        <NavBar />
        <PageLoader />

        <div className="page-header">
          {carouselSection && carouselSection.images
          && (
            <ScrollAnimation animateIn="fadeIn" duration={2} animateOnce>
              <Carousel id="homepage" imageUrls={carouselSection.images} />
            </ScrollAnimation>
          )}
        </div>

        <div className="main-body" style={{ backgroundImage: `url(${localFiles.images.crossword})` }}>
          {aboutSection && aboutSection.body && (
            <ScrollAnimation animateIn="bounceInUp" duration={1} delay={2} animateOnce>
              <About aboutSection={aboutSection} />
            </ScrollAnimation>
          )}

          {contacts && contacts.length > 0 && (
            <ScrollAnimation animateIn="bounceInUp" duration={1} animateOnce>
              <Contacts contacts={contacts} />
            </ScrollAnimation>
          )}

          <div className="large-footer section-padding responsive-flex" style={style}>
            <div className="links-section responsive-flex-child half">
              <ul>
                {navLinks.map((link, index) => (
                  <li key={String(index)}>
                    <Link
                      activeClass="bold"
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
              <div className="social-media">
                {socialMediaPlatforms.map(platform => (
                  <a key={platform.url} href={platform.url} target="_blank" rel="noopener noreferrer">
                    <img src={platform.logo} alt={platform.name} className="social-media-logo" />
                  </a>
                ))}
              </div>
            </div>
            <div className="contact-form-section responsive-flex-child half">
              <ContactForm />
            </div>
          </div>
          <div className="small-footer responsive-flex">
            <span className="responsive-flex-child half">
              &copy;
              &nbsp;
              {new Date().getFullYear()}
              &nbsp;
              LIFE Ministries Uganda. All Rights Reserved.
            </span>
            <a
              href="https://iviidev.info"
              target="_blank"
              rel="noopener noreferrer"
              className="responsive-flex-child half developer"
            >
                Developer
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getAllSectionsDispatch: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ sectionsReducer }) => ({
  sections: sectionsReducer.sections,
});
const mapDispatchToProps = {
  getAllSectionsDispatch: getAllSections,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
