import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputForm from './form';
import { editSection } from '../../redux/actions/websiteSections';
import paths, { endpoints, entityTypes, removeUnsupportedProperties } from '../../common';
import cloudinaryWidgetOptions from '../../common/cloudinary';

export class EditWebsiteSection extends Component {
  state = {
    section: {
      category: entityTypes[0],
      images: [],
      videos: [],
      files: [],
      tags: [],
    },
  }

  componentDidMount() {
    const { section } = this.state;
    const {
      match, sections, history,
    } = this.props;
    const selectedEntity = sections.find(entity => entity._id === match.params.id);
    if (selectedEntity) {
      this.setState({ section: { ...section, ...selectedEntity } });
    } else history.push(paths.dashboard.sections);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { section } = this.state;
    const { editSectionDispatch, match, history } = this.props;
    const unsupportedProperties = ['_id', 'dateCreated', '__v'];
    const sectionCleaned = removeUnsupportedProperties(section, unsupportedProperties);
    editSectionDispatch(endpoints().articlesPut(match.params.id), sectionCleaned, history);
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

  handleOnBooleanValueChange = (e) => {
    const { name, checked } = e.target;
    const { section } = this.state;
    this.setState({
      section: {
        ...section,
        [name]: checked,
      },
    });
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
        title="Edit Website Section"
        onChange={this.handleOnChange}
        onBooleanValueChanged={this.handleOnBooleanValueChange}
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

EditWebsiteSection.propTypes = {
  editSectionDispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ sectionsReducer }) => ({
  sections: sectionsReducer.sections,
});
const mapDispatchToProps = {
  editSectionDispatch: editSection,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditWebsiteSection);
