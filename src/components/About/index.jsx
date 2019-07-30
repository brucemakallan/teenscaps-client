import React from 'react';
import './about.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHistory, faUserTie, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';


const icons = [
  <FontAwesomeIcon className="accentColor large" icon={faHistory} />,
  <FontAwesomeIcon className="accentColor large" icon={faUserTie} />,
  <FontAwesomeIcon className="accentColor large" icon={faCheck} />
];

const About = ({ aboutSection }) => (
  <div id="about-anchor" className="about-page">
    <div className="section-padding">
      {aboutSection && (
        <React.Fragment>
          <div className="section-sub-heading">
            <div className="about-logo-wrapper">
              <img src={aboutSection.files[0].source} alt="Logo" className="about-logo" />
            </div>
            <div>
              <span className="bold accentColor">TEENS</span>
              <span className="bold primaryColor">CAPS</span>
            </div>
          </div>

          <div className="section-heading">
            Who we are
            <hr />
          </div>

          <div className="responsive-flex">
            <div className="about-image responsive-flex-child third">
              {aboutSection.images && aboutSection.images.length > 0
            && <img src={aboutSection.images[0]} alt="about us" />}
            </div>

            <div className="about-details responsive-flex-child two-thirds">
              {aboutSection.body.split('>').map((aboutInfo, index) => (
                aboutInfo.length > 0 && (
                  <div key={String(index)} className="about-info mb-4">
                    <div className="circled">
                      {icons[index]}
                    </div>
                    <div className="text">
                      <ReactMarkdown source={aboutInfo} />
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  </div>
);

About.propTypes = {
  aboutSection: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.string.isRequired,
    })).isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default About;
