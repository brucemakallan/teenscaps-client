import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

const carouselId = id => `imageCarousel-${id}`;

const Carousel = ({ id, imageUrls, captions }) => (
  <div id={carouselId(id)} className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      {imageUrls.map((url, index) => (
        <li
          data-target={`#${carouselId(id)}`}
          data-slide-to={index.toString()}
          className={index === 0 ? 'active' : ''}
          key={url}
        />
      ))}
    </ol>

    <div className="carousel-inner">
      {imageUrls.map((url, index) => (
        <div className={index === 0 ? 'carousel-item active' : 'carousel-item'} key={url}>
          <img className="d-block h-100" src={url} alt="poster" />
          {captions && captions[index] && (
            <div className="carousel-caption d-none d-md-block">
              <span className="caption-heading">{captions[index]}</span>
            </div>
          )}
        </div>
      ))}
    </div>

    <a className="carousel-control-prev nextPrevIcon" href={`#${carouselId(id)}`} role="button" data-slide="prev">
      <FontAwesomeIcon className="large" icon={faLongArrowAltLeft} />
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next nextPrevIcon" href={`#${carouselId(id)}`} role="button" data-slide="next">
      <FontAwesomeIcon className="large" icon={faLongArrowAltRight} />
      <span className="sr-only">Next</span>
    </a>
  </div>
);

Carousel.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  captions: PropTypes.arrayOf(PropTypes.string),
};

Carousel.defaultProps = {
  captions: []
};

export default Carousel;
