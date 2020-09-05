import React from "react"

const Registration = () => (
    <form className="registration">
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
)

export default Registration
