import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputForm from './form';
import { postSection } from '../../redux/actions/websiteSections';
import { endpoints, entityTypes } from '../../common';
import cloudinaryWidgetOptions from '../../common/cloudinary';

export class CreateWebsiteSection extends Component {
  state = {
    section: {
      category: entityTypes[0],
      images: [],
      videos: [], // {title: '', description: '', source: ''}
      files: [], // {title: '', description: '', source: ''}
      tags: [], // {id: 'lorem', text: 'lorem'}
    },
  }

  handleSubmit = (e, createAnother = false) => {
    e.preventDefault();
    const { section } = this.state;
    const { createSectionDispatch, history } = this.props;
    createSectionDispatch(endpoints().articlesPost, section, history, createAnother);
  }

  handleOnChange = (e, passedValue) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { section } = this.state;
    if (passedValue) {
      this.setState({
        section: {
          ...section,
          [name]: passedValue,
        },
      });
    } else {
      this.setState({
        section: {
          ...section,
          [name]: value,
        },
      });
    }
  }

  handleOnArrayChange = (e, propertyArray, index) => { // array with objects
    e.preventDefault();
    const { name, value } = e.target;
    const { section } = this.state;
    const array = propertyArray;
    array[index][name] = value;
    this.setState({
      section: {
        ...section,
        array,
      },
    });
  }

  removeRow = (array, index) => {
    const { section } = this.state;
    array.splice(index, 1);
    this.setState({
      section: {
        ...section,
        array,
      },
    });
  }

  addRow = (array, row = '') => {
    const { section } = this.state;
    array.push(row);
    this.setState({
      section: {
        ...section,
        array,
      },
    });
  }

  addCloudinaryImage = (array) => {
    const cloudinaryWidget = window.cloudinary.createUploadWidget(cloudinaryWidgetOptions,
      (error, result) => {
        if (!error && result && result.info && result.event === 'success') {
          const { secure_url } = result.info;
          this.addRow(array, secure_url);
        }
      });
    cloudinaryWidget.open();
  }

  addCloudinaryRawFile = (index) => {
    const { section, section: { files } } = this.state;
    const cloudinaryWidget = window.cloudinary.createUploadWidget(cloudinaryWidgetOptions,
      (error, result) => {
        if (!error && result && result.info && result.event === 'success') {
          const { secure_url } = result.info;
          const updatedFiles = files;
          updatedFiles[index].source = secure_url;
          this.setState({
            section: {
              ...section,
              files: updatedFiles,
            },
          });
        }
      });
    cloudinaryWidget.open();
  }

  handleTagDelete = (i) => {
    const { section } = this.state;
    this.setState({
      section: {
        ...section,
        tags: section.tags.filter((tag, index) => index !== i),
      }
    });
  }

  handleTagAddition = (tag) => {
    this.setState(state => ({
      section: {
        ...state.section,
        tags: [...state.section.tags, tag],
      }
    }));
  }

  handleTagDrag = () => {}
  // handleTagDrag = (tag, currPos, newPos) => {
  //   const { section: { tags }, section } = this.state;
  //   tags.splice(currPos, 1);
  //   tags.splice(newPos, 0, tag);
  //   this.setState({
  //     section: {
  //       ...section,
  //       tags,
  //     }
  //   });
  // }

  render() {
    const { section } = this.state;
    const { sections } = this.props;

    return (
      <InputForm
        isNew
        title="Create New Website Section"
        onChange={this.handleOnChange}
        onArrayChange={this.handleOnArrayChange}
        removeRow={this.removeRow}
        addRow={this.addRow}
        addCloudinaryImage={this.addCloudinaryImage}
        addCloudinaryRawFile={this.addCloudinaryRawFile}
        onSubmit={this.handleSubmit}
        entity={section}
        allEntities={sections}
        onTagDelete={this.handleTagDelete}
        onTagAdd={this.handleTagAddition}
        onTagDrag={this.handleTagDrag}
      />
    );
  }
}

CreateWebsiteSection.propTypes = {
  createSectionDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ sectionsReducer }) => ({
  sections: sectionsReducer.sections,
});
const mapDispatchToProps = {
  createSectionDispatch: postSection,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateWebsiteSection);
