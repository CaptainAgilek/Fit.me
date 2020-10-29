import React, { Component } from "react";

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
  /*constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }*/

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
              ? 'Full Name must be 5 characters long!'
              : '';
          break;
        case 'email':
          errors.email =
            validEmailRegex.test(value)
              ? ''
              : 'Email is not valid!';
          break;
        case 'password':
          errors.password =
           validPasswordRegex.test(value)
               ? ''
               : 'Password is not valid!';
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
      /*const handleSubmit = event => {
         event.preventDefault();
         alert('You have submitted the form.');
         console.log("athlete:" + event.target.elements.athlete.value);
         console.log("trainer:" + event.target.elements.trainer.value);
         console.log("organization:" + event.target.elements.organization.value);

         console.log(event.target.fullname.value);
         console.log(event.target.email.value);
         console.log(event.target.password.value);
         console.log(event.target.conpassword.value);
       }*/

      return (
            <form /*onSubmit={handleSubmit}*/ onSubmit={this.handleSubmit} noValidate>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="athlete" name="athlete"/>
                        <label className="custom-control-label" htmlFor="athlete">Athlete</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="trainer" name="trainer"/>
                        <label className="custom-control-label" htmlFor="trainer">Trainer</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="organization" name="organization"/>
                        <label className="custom-control-label" htmlFor="organization">Organization</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Full name</label>
                    <input ref="fullname" type="text" className="form-control" placeholder="Full name" name="fullName" onChange={this.handleChange} noValidate/*value={this.state.value} onChange={this.handleChange}*//>
                    {errors.fullName.length > 0 && <span className='error'>{errors.fullName}</span>}
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input ref="email" type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.handleChange} noValidate/*value={this.state.value} onChange={this.handleChange}*//>
                    {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input ref="password" type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange} noValidate/>
                    {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input ref="conpassword" type="password" className="form-control" placeholder="Confirm password" name="conpassword" onChange={this.handleChange} noValidate/>
                    {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}
