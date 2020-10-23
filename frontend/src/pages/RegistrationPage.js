import React from 'react';
import { Form, Field } from "@progress/kendo-react-form";

export function RegistrationPage() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const handleSubmit = (event) => {
    console.log(`
      Email: ${email}
      Password: ${password}
      Accepted Terms: ${acceptedTerms}
    `);

    event.preventDefault();
  }

  return (
    //<div className="appWrapper"></div>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>

          <label>
            Email:
            <input
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required />
          </label>
          
          <label>
            Password:
              <input
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required />
          </label>

          <label>
            <input
              name="acceptedTerms"
              type="checkbox"
              onChange={e => setAcceptedTerms(e.target.value)}
              required />
            I accept the terms of service
          </label>

          <button>Submit</button>
        </form>
  );
}
