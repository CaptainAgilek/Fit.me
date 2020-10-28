import React, { Component } from "react";
import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPasswordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export default class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fullName: null,
        email: null,
        password: null,
        errors: {
          fullName: '',
          email: '',
          password: '',
        }
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;

      switch (name) {
        case 'fullName':
          errors.fullName =
            value.length < 5
              ? 'Full Name must be 5 characters long'
              : '';
          break;
        case 'email':
          errors.email =
            validEmailRegex.test(value)
              ? ''
              : 'Email is not valid';
          break;
        case 'password':
          errors.password =
           validPasswordRegex.test(value)
               ? ''
               : 'Password must be 8 characters long';
           break;
            /*value.length < 8
              ? 'Password must be 8 characters long!'
              : '';
          break;*/
        default:
          break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }
    console.log('-->', formData);

    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }

    render() {
      const {errors} = this.state;

        return (
            <form>
                <h3>Registration</h3>


                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="athlete" />
                        <label className="custom-control-label" htmlFor="athlete">Athlete</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="trainer" />
                        <label className="custom-control-label" htmlFor="trainer">Trainer</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="organization" />
                        <label className="custom-control-label" htmlFor="organization">Organization</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Full name</label>
                    <input type="text" className="form-control" placeholder="Full name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password" className="form-control" placeholder="Confirm password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}
