import React from 'react';
import './services.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faDollarSign, faLeaf } from '@fortawesome/free-solid-svg-icons';

const icons = [
  <FontAwesomeIcon className="white" icon={faSync} />,
  <FontAwesomeIcon className="white" icon={faDollarSign} />,
  <FontAwesomeIcon className="white" icon={faLeaf} />
];

const Services = ({ services }) => (
  <div id="services-anchor" className="services-page">
    <div className="section-padding">
      <div className="section-heading">
        What we offer
        <hr />
      </div>

      <div className="all-services responsive-flex">
        {services && services.map((service, index) => (
          <div key={service._id} className="service-box responsive-flex-child third">
            <div className="wrapper" style={{ backgroundImage: `url(${service.images[0]})` }}>
              <div className="contents">
                <div className="heading">
                  <span className="medium">{icons[index]}</span>
                  <h4>{service.heading1}</h4>
                </div>
                <div className="details">{service.body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

Services.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Services;
