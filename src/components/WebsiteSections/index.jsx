import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WebsiteSectionsTable from './table';
import getAllSections, { deleteSection } from '../../redux/actions/websiteSections';
import { endpoints } from '../../common';
import Modal from '../Modal';

export class WebsiteSections extends Component {
  state = {
    showModal: false,
  }

  componentDidMount() {
    const { getAllSectionsDispatch } = this.props;
    getAllSectionsDispatch(endpoints().articlesGetAll);
  }

  handleDelete = (id) => {
    if (id) {
      const { deleteSectionDispatch } = this.props;
      deleteSectionDispatch(endpoints().articlesDelete(id));
    }
    this.handleHideModal();
  }

  saveID = (id) => {
    this.setState({ id });
    this.handleShowModal();
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  }

  handleHideModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { sections } = this.props;
    const { id, showModal } = this.state;
    return (
      <React.Fragment>
        {id && (
          <Modal
            show={showModal}
            hideModal={this.handleHideModal}
            title="Delete?"
            body="Are you sure you want to Delete this item?"
            primaryAction="Delete"
            secondaryAction="Cancel"
            onClick={this.handleDelete}
            id={id}
          />
        )}
        <WebsiteSectionsTable data={sections} saveID={this.saveID} />
      </React.Fragment>
    );
  }
}

WebsiteSections.propTypes = {
  getAllSectionsDispatch: PropTypes.func.isRequired,
  deleteSectionDispatch: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ sectionsReducer }) => ({
  sections: sectionsReducer.sections,
});
const mapDispatchToProps = {
  getAllSectionsDispatch: getAllSections,
  deleteSectionDispatch: deleteSection,
};
export default connect(mapStateToProps, mapDispatchToProps)(WebsiteSections);
