import React, { Component } from 'react';
import './contactForm.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sendEmail from '../../redux/actions/emailActions';
import { endpoints } from '../../common';

const formFields = [
  {
    id: 'fullName',
    type: 'text',
    placeholder: 'Full Name',
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    id: 'subject',
    type: 'text',
    placeholder: 'Subject',
  },
];

class ContactForm extends Component {
  state = {
    fullName: '',
    email: '',
    subject: '',
    message: '',
  }

  onChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      fullName, email, subject, message,
    } = this.state;
    const { sendEmailDispatch } = this.props;
    const body = {
      name: fullName,
      email,
      subject,
      message,
    };
    sendEmailDispatch(endpoints().sendEmail, body);
  }

  render() {
    return (
      <div className="contact-form">
        <form onSubmit={this.onSubmit}>
          {formFields.map(field => (
            <div key={field.id} className="form-group">
              <input
                type={field.type}
                name={field.id}
                id={field.id}
                placeholder={field.placeholder}
                onChange={this.onChange}
                required
                className="form-control"
              />
            </div>
          ))}
          <div className="form-group">
            <textarea
              name="message"
              id="message"
              className="form-control"
              rows={5}
              placeholder="Message"
              required
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            SEND EMAIL
          </button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  sendEmailDispatch: PropTypes.func.isRequired,
};
const mapStateToProps = state => (state);
const mapDispatchToProps = {
  sendEmailDispatch: sendEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
