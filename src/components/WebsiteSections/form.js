import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { WithContext as ReactTags } from 'react-tag-input';
import {
  dateToEpoc,
  epocToDate,
  SHORT_DATE_FORMAT,
} from '../../common/manipulateDates';
import { entityTypes } from '../../common';

library.add(faTrash, faCloudUploadAlt);

class InputForm extends Component {
  renderTagInput = (isTagInput, tags, suggestions, onTagAdd, onTagDelete, onTagDrag) => {
    const KeyCodes = { comma: 188, enter: 13 };
    return (
      <React.Fragment>
        {isTagInput && (
          <div className="tags">
            <ReactTags
              tags={tags}
              suggestions={suggestions}
              handleDelete={onTagDelete}
              handleAddition={onTagAdd}
              handleDrag={onTagDrag}
              delimiters={[KeyCodes.comma, KeyCodes.enter]}
            />
          </div>
        )}
      </React.Fragment>
    );
  }

  renderLabel = (label, required) => (
    <React.Fragment>
      <div>
        {label}
        {required && <span className="red" title="Required"> *</span>}
      </div>
    </React.Fragment>
  );

  renderBooleanValue = (isBooleanValue, entity, value, fieldName, required, onBooleanValueChanged) => (
    <React.Fragment>
      {isBooleanValue
        && (
          <div>
            <input
              type="checkbox"
              className="form-control"
              id={fieldName}
              name={fieldName}
              required={required}
              onChange={onBooleanValueChanged}
              checked={(entity && !!value)}
              value={(entity && value)}
            />
          </div>
        )
      }
    </React.Fragment>
  );

  renderTextInput = (isTextInput, isNumber, fieldName, required, onChange, entity, value) => (
    <React.Fragment>
      {isTextInput && (
        <input
          type={isNumber ? 'number' : 'text'}
          className="form-control"
          id={fieldName}
          name={fieldName}
          required={required}
          onChange={onChange}
          defaultValue={(entity && value) || ''}
        />
      )}
    </React.Fragment>
  );

  renderDateInput = (isDateInput, fieldName, required, onChange, entity, value) => (
    <React.Fragment>
      {isDateInput && (
        <input
          type="date"
          className="form-control"
          id={fieldName}
          name={fieldName}
          required={required}
          onChange={e => onChange(e, dateToEpoc(e.target.value))}
          defaultValue={(entity && value && epocToDate(value, SHORT_DATE_FORMAT)) || ''}
        />
      )}
    </React.Fragment>
  );

  renderTextArea = (isTextArea, fieldName, required, onChange, entity, value) => (
    <React.Fragment>
      {isTextArea && (
        <textarea
          rows="10"
          className="form-control"
          id={fieldName}
          name={fieldName}
          required={required}
          onChange={onChange}
          value={(entity && value) || ''}
        />
      )}
    </React.Fragment>
  );

  renderDropdownList = (list, fieldName, required, onChange, entity, value) => (
    <React.Fragment>
      {(list && list.length > 0)
        && (
          <select
            className="form-control"
            id={fieldName}
            name={fieldName}
            required={required}
            onChange={onChange}
            value={entity && value}
          >
            {(list[0]._id && list[0].category)
              ? (
                <React.Fragment>
                  <option value="">N/A</option>
                  {list.map(
                    (p, index) => (
                      <option value={p._id} key={String(index)}>
                        {`${p.category.toUpperCase()}: ${p._id} ${p.heading1 ? p.heading1 : ''}`}
                      </option>
                    )
                  )}
                </React.Fragment>
              )
              : list.map((p, index) => <option value={p} key={String(index)}>{p}</option>)
            }
          </select>
        )}
    </React.Fragment>
  );

  renderMultipleStringInput = (
    many, value, fieldName, onArrayChange, removeRow, addRow, addCloudinaryRawFile, isFileInput,
  ) => (
    <React.Fragment>
      {many && value && Array.isArray(value)
          && (
            <div>
              <div className="groupedValues">
                {value.map((element, index) => (
                  <div key={String(index)} className="flex-container single-element">
                    <div className="inputFields">
                      <input
                        type="text"
                        className={`form-control ${fieldName}`}
                        name="title"
                        placeholder="Title"
                        onChange={e => onArrayChange(e, value, index)}
                        value={(element && element.title) || ''}
                      />
                      <input
                        type="text"
                        className={`form-control ${fieldName}`}
                        name="description"
                        placeholder="Description"
                        onChange={e => onArrayChange(e, value, index)}
                        value={(element && element.description) || ''}
                      />
                      <input
                        type="text"
                        className={`form-control ${fieldName}`}
                        name="source"
                        placeholder="Source"
                        onChange={e => onArrayChange(e, value, index)}
                        value={(element && element.source) || ''}
                        required
                      />
                      {isFileInput && (
                        <button
                          type="button"
                          id="addRowBt"
                          className="iconBorderedButton m-2"
                          title="Upload file"
                          onClick={() => addCloudinaryRawFile(index)}
                        >
                          <FontAwesomeIcon icon="cloud-upload-alt" className="icon green" />
                          Upload File
                        </button>
                      )}
                    </div>
                    <button
                      type="button"
                      id="removeRowBt"
                      className="iconButton"
                      onClick={() => removeRow(value, index)}
                      title="Remove"
                    >
                      <FontAwesomeIcon icon="trash" className="icon red" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
      }
      {many && (
        <button
          type="button"
          id="addRowBt"
          className="btn btn-sm m-2 btn-outline-primary"
          onClick={() => addRow(value, { title: '', description: '', source: '' })}
        >
            Add Another
        </button>
      )}
    </React.Fragment>
  );

  renderImagesInput = (images, value, removeRow, addCloudinaryImage) => (
    <React.Fragment>
      {images && value && value.length > 0 && (
        <div>
          <div className="website-section-images responsive-flex">
            {value.map((imageUrl, index) => (
              <div key={String(index)} className="text-center">
                <div className="imageHolder"><img src={imageUrl} alt="poster" /></div>
                <button
                  type="button"
                  id="removeRowBt"
                  className="iconBorderedButton red"
                  onClick={() => removeRow(value, index)}
                  title="Remove"
                >
                  <FontAwesomeIcon icon="trash" className="icon red" />
                  <small>Delete Image</small>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {images && (
        <button
          type="button"
          id="addRowBt"
          className="btn btn-sm m-2 btn-outline-primary"
          onClick={() => addCloudinaryImage(value)}
        >
          Upload Image
        </button>
      )}
    </React.Fragment>
  );

  renderAllFormFields = (
    index,
    label,
    fieldName,
    value,
    onChange,
    onBooleanValueChanged,
    onArrayChange,
    removeRow,
    addRow,
    addCloudinaryImage,
    addCloudinaryRawFile,
    entity,
    required,
    list,
    many,
    isTextArea,
    images,
    isNumber,
    isTextInput,
    isTagInput,
    tagSuggestions,
    onTagAdd,
    onTagDelete,
    onTagDrag,
    isDateInput,
    isFileInput,
    isBooleanValue,
  ) => (
    <div className="form-group" key={String(index)}>
      {this.renderBooleanValue(isBooleanValue, entity, value, fieldName, required, onBooleanValueChanged)}
      {this.renderLabel(label, required)}
      {this.renderImagesInput(images, value, removeRow, addCloudinaryImage)}
      {this.renderTagInput(isTagInput, value, tagSuggestions, onTagAdd, onTagDelete, onTagDrag)}
      {this.renderTextArea(isTextArea, fieldName, required, onChange, entity, value)}
      {this.renderMultipleStringInput(
        many, value, fieldName, onArrayChange, removeRow, addRow, addCloudinaryRawFile, isFileInput
      )}
      {this.renderDropdownList(list, fieldName, required, onChange, entity, value)}
      {this.renderTextInput(isTextInput, isNumber, fieldName, required, onChange, entity, value)}
      {this.renderDateInput(isDateInput, fieldName, required, onChange, entity, value)}
    </div>
  );

  render() {
    const {
      title,
      onChange,
      onBooleanValueChanged,
      onArrayChange,
      removeRow,
      addRow,
      addCloudinaryImage,
      addCloudinaryRawFile,
      onSubmit,
      entity,
      // allEntities,
      isNew,
      tagSuggestions,
      onTagAdd,
      onTagDelete,
      onTagDrag,
    } = this.props;

    const formFields = [
      {
        label: 'Pinned',
        fieldName: 'pinned',
        value: entity && entity.pinned,
        isBooleanValue: true,
      },
      {
        label: 'Images',
        fieldName: 'images',
        value: entity && entity.images,
        required: true,
        images: true,
      },
      {
        label: 'Category',
        fieldName: 'category',
        value: entity && entity.category,
        required: true,
        list: entityTypes,
      },
      {
        label: 'Date',
        fieldName: 'dateIn',
        value: entity && entity.dateIn,
        isDateInput: true,
      },
      {
        label: 'Heading',
        fieldName: 'heading1',
        value: entity && entity.heading1,
        isTextInput: true,
      },
      {
        label: 'Body',
        fieldName: 'body',
        value: entity && entity.body,
        required: true,
        isTextArea: true,
      },
      {
        label: 'Files',
        fieldName: 'files',
        value: entity && entity.files,
        isFileInput: true,
        many: true,
      },
      {
        label: 'Youtube Videos',
        fieldName: 'videos',
        value: entity && entity.videos,
        many: true,
      },
    ];

    return (
      <div>
        <h1>{title}</h1>
        <form className="inputForm" id="customInputForm" onSubmit={onSubmit}>
          {formFields.map((v, index) => this.renderAllFormFields(
            index,
            v.label,
            v.fieldName,
            v.value,
            onChange,
            onBooleanValueChanged,
            onArrayChange,
            removeRow,
            addRow,
            addCloudinaryImage,
            addCloudinaryRawFile,
            entity,
            v.required,
            v.list,
            v.many,
            v.isTextArea,
            v.images,
            v.isNumber,
            v.isTextInput,
            v.isTagInput,
            tagSuggestions,
            onTagAdd,
            onTagDelete,
            onTagDrag,
            v.isDateInput,
            v.isFileInput,
            v.isBooleanValue,
          ))}
          <div className="mb-2">
            <span className="red" title="Required"> * </span>
            <span>Required Fields</span>
          </div>
          <button type="submit" className="btn btn-primary mr-3">Save</button>
          {isNew && (
            <button type="button" onClick={event => onSubmit(event, true)} className="btn btn-primary">
              Save &amp; Create Another
            </button>
          )}
        </form>
      </div>
    );
  }
}

InputForm.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBooleanValueChanged: PropTypes.func.isRequired,
  onArrayChange: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  addCloudinaryImage: PropTypes.func.isRequired,
  addCloudinaryRawFile: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  entity: PropTypes.shape({
    pinned: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.shape()),
    parent: PropTypes.string,
    category: PropTypes.string,
    heading1: PropTypes.string,
    heading2: PropTypes.string,
    heading3: PropTypes.string,
    heading4: PropTypes.string,
    heading5: PropTypes.string,
    heading6: PropTypes.string,
    body: PropTypes.string,
    dateIn: PropTypes.string,
    dateOut: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.shape()),
    videos: PropTypes.arrayOf(PropTypes.shape()),
  }),
  // allEntities: PropTypes.arrayOf(PropTypes.shape({})),
  isNew: PropTypes.bool,
  tagSuggestions: PropTypes.arrayOf(PropTypes.shape({})),
  onTagAdd: PropTypes.func.isRequired,
  onTagDelete: PropTypes.func.isRequired,
  onTagDrag: PropTypes.func.isRequired,
};
InputForm.defaultProps = {
  title: 'Create new',
  entity: {},
  // allEntities: [],
  isNew: false,
  tagSuggestions: [],
};
export default InputForm;
