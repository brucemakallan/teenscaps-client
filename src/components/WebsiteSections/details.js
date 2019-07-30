import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import date from 'date-and-time';
import ReactMarkdown from 'react-markdown';
import paths from '../../common';
import assignIcon from '../../common/assignIcon';
import './details.scss';
import Carousel from '../Carousel';
import renderYoutubeVideo from '../../common/renderYoutubePlayer';

library.add(faArrowLeft, faExclamationTriangle);

class Details extends Component {
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  renderListOfVideos = (label, list) => (
    list && list.length > 0 && (
      <div className="website-section-property" key={label}>
        <div className="headingLabel">{label}</div>
        <div className="responsive-flex flex-normal">
          {list.map((obj, index) => (
            <div key={String(index)} className="responsive-flex-child third">
              <div className="video-box">
                {Object.keys(obj).map(objKey => (
                  <React.Fragment key={objKey}>
                    <div className="video-attribute">{`${objKey.toUpperCase()}: ${obj[objKey]}`}</div>
                    {(obj.source === obj[objKey]) && renderYoutubeVideo('200', '100%', obj.source)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );

  renderArrayOfObjects = (label, list) => (
    list && list.length > 0 && (
      <div className="website-section-property" key={label}>
        <div className="headingLabel">{label}</div>
        {list.map((obj, index) => (
          <ul key={String(index)} className="noBulletList">
            {Object.keys(obj).map(objKey => (
              (objKey === 'url' || objKey === 'link' || objKey === 'source')
                ? (
                  <li key={objKey}>
                    {assignIcon(obj[objKey])}
                    <a href={obj[objKey]} target="_blank" rel="noopener noreferrer" title={obj[objKey]}>
                      {`File ${index + 1}`}
                    </a>
                  </li>
                )
                : <li key={objKey}>{`${objKey.toUpperCase()}: ${obj[objKey]}`}</li>))}
            <hr />
          </ul>
        ))}
      </div>
    )
  );

  renderValue = (label, value, isArrayOfObjects, isVideos) => {
    if (value) {
      if (isVideos) {
        return this.renderListOfVideos(label, value);
      }
      if (isArrayOfObjects) {
        return this.renderArrayOfObjects(label, value);
      }
      if (Array.isArray(value)) {
        return (
          <div className="website-section-property" key={label}>
            <div className="headingLabel">{label}</div>
            <ul>
              {value.map(element => <li key={element}>{element}</li>)}
            </ul>
          </div>
        );
      }
      return (
        <div className="website-section-property" key={label}>
          <div className="headingLabel">{label}</div>
          <ReactMarkdown source={value} />
        </div>
      );
    } return '';
  };

  renderDateTime = (label, dateTimeEpoc) => (
    dateTimeEpoc && dateTimeEpoc.length > 0 && (
      <div className="website-section-property" key={label}>
        <div className="headingLabel">{label}</div>
        <span>
          {date.format(new Date(Number(dateTimeEpoc)), 'ddd DD MMM YYYY HH:mm:ss Z')}
        </span>
      </div>
    )
  );

  render() {
    const { sections, match } = this.props;
    const section = sections.find(p => p._id === match.params.id);
    let mainDetails;
    let otherDetails;
    let dates;
    if (section) {
      mainDetails = [
        { label: 'ID', value: section._id },
        { label: 'Parent', value: section.parent },
        { label: 'Category', value: section.category.toUpperCase() },
      ];
      otherDetails = [
        { label: 'Heading1', value: section.heading1 },
        { label: 'Heading2', value: section.heading2 },
        { label: 'Heading3', value: section.heading3 },
        { label: 'Heading4', value: section.heading4 },
        { label: 'Heading5', value: section.heading5 },
        { label: 'Heading6', value: section.heading6 },
        { label: 'Body', value: section.body },
        { label: 'Tags', value: section.tags, isArrayOfObjects: true },
        {
          label: 'Files', value: section.files, isArrayOfObjects: true,
        },
        {
          label: 'Videos', value: section.videos, isArrayOfObjects: true, isVideos: true,
        },
      ];
      dates = [
        { label: 'Date Created', value: section.dateCreated },
        { label: 'Date-In', value: section.dateIn },
        { label: 'Date-Out', value: section.dateOut },
      ];
    }

    return (
      <React.Fragment>
        {section ? (
          <React.Fragment>
            <div className="flex-container page-header mb-3 mr-3">
              <button type="button" className="iconButton" onClick={this.goBack}>
                <FontAwesomeIcon icon="arrow-left" className="icon" />
              </button>
              {section.heading1 ? <h1>{section.heading1}</h1> : ''}
              <Link
                className="btn btn-primary btn-sm button-link"
                to={`${paths.dashboard.sections}/edit/${section._id}`}
              >
              Edit
              </Link>
            </div>
            <div className="mainDetails">
              {section.images && section.images.length > 0 && (
                <div className="images">
                  <Carousel id={section._id} imageUrls={section.images} />
                </div>
              )}
              <div
                className={
                  `details ${(!section.images || (section.images && section.images.length === 0)) ? 'w-100' : ''}`
                }
              >
                <div className="material-card">
                  {mainDetails.map(
                    detail => this.renderValue(
                      detail.label, detail.value, detail.isArrayOfObjects, detail.isVideos
                    )
                  )}
                  {dates.map(dateInput => this.renderDateTime(dateInput.label, dateInput.value))}
                </div>
              </div>
            </div>
            <div className="otherDetails">
              <div className="material-card mb-3">
                <div className="card-heading">
                  MORE DETAILS
                </div>
                {otherDetails.map(
                  detail => this.renderValue(
                    detail.label, detail.value, detail.isArrayOfObjects, detail.isVideos
                  )
                )}
              </div>
            </div>
          </React.Fragment>
        ) : this.goBack()}
      </React.Fragment>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({}).isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ sectionsReducer }) => ({
  sections: sectionsReducer.sections,
});

export default connect(mapStateToProps)(Details);
