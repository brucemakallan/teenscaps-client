import React from 'react';
import './contacts.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone, faLocationArrow, faEnvelopeOpen,
} from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';

const icons = [
  <FontAwesomeIcon className="white large" icon={faEnvelopeOpen} />,
  <FontAwesomeIcon className="white large" icon={faLocationArrow} />,
  <FontAwesomeIcon className="white large" icon={faPhone} />,
];

const Contacts = ({ contacts }) => (
  <div id="contacts-anchor" className="contacts-page">
    <div className="section-padding">
      <div className="contact-boxes responsive-flex">
        {contacts && (
          contacts.map((contact, index) => (
            <div key={String(index)} className="contact-box responsive-flex-child third">
              <div className="circled">
                {icons[index]}
              </div>
              <div className="contact-body">
                <ReactMarkdown source={contact.body} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Contacts;
