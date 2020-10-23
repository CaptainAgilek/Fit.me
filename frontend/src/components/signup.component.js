import React, { Component } from "react";

export default class SignUp extends Component {

    render() {
        return (
            <form>
                <h3>Sign Up</h3>

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

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}
