import React from "react"

interface RegistrationProps {
  displayRegistration: Function
}

const Registration = ({ displayRegistration }: RegistrationProps) => (
  <div className="registration">
    <div className="close" onClick={() => displayRegistration(false)}>
      <span>✖</span>
    </div>
    <form>
      <h4>Please enter your credentials</h4>
      <div>
        <label>
          <input type="email" name="user_email" placeholder="e-mail"></input>
        </label>
        <label>
          <input
            type="password"
            name="user_password"
            placeholder="password"
          ></input>
        </label>
        <label>
          <input
            type="password"
            name="user_password_verification"
            placeholder="verify password"
          ></input>
        </label>
      </div>
      <button type="submit">submit</button>
    </form>
  </div>
)

export default Registration
