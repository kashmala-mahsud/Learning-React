import React, { useState } from "react";

export function LogInPage() {
  let [UserName, setName] = useState(" ");
  let [UserEmail, setEmail] = useState(" ");
  let [UserDOB, setDOB] = useState(" ");
  let [UserPassword, setPassword] = useState(" ");
  let [ConPassword, setConPassword] = useState(" ");
  let [Errpassword, setErrpassword] = useState("");
  let [ErrEmail, setErrEmail] = useState("");
  let [Err, setErr] = useState("");
  function Submitted(e) {
    e.preventDefault();
    if (
      UserName &&
      UserEmail &&
      UserDOB &&
      UserPassword &&
      ConPassword === " "
    ) {
      setErr("Error! please enter values.");
    } else {
      if (UserPassword === ConPassword) {
        let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (!emailRegex.test(UserEmail)) {
          setErrEmail("Error! you have entered invalid email.");
        } else {
          alert(
            `${UserName},${UserEmail},${UserDOB},${UserPassword},${ConPassword}`
          );
        }
      } else {
        setErrpassword("Error! you have entered invalid password");
      }
    }
  }

  function GetName(e) {
    setName(e.target.value);
  }
  function GetEmail(e) {
    setEmail(e.target.value);
  }
  function GetDOB(e) {
    setDOB(e.target.value);
  }
  function GetPassword(e) {
    setPassword(e.target.value);
  }
  function ConfirmPassword(e) {
    setConPassword(e.target.value);
  }

  return (
    <div>
      <form action="#" onSubmit={Submitted}>
        <input
          type="text"
          placeholder="Enter Name"
          name="Name"
          style={{ padding: "10px", marginRight: "30px" }}
          onChange={GetName}
        />
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          style={{ padding: "10px", marginRight: "30px" }}
          onChange={GetEmail}
        />
        <p>{ErrEmail}</p>
        <input
          type="text"
          placeholder="Enter DOB"
          name="DoB"
          style={{ padding: "10px", marginRight: "30px" }}
          onChange={GetDOB}
        />
        <br /> <br />
        <select name="fields" style={{ padding: "15px", fontSize: "15px" }}>
          <option value="">Please enter any field</option>
          <option value="doctor">Doctor</option>
          <option value="engineer">Engineer</option>
          <option value="teacher">Teacher</option>
        </select>
        <br /> <br />
        <input
          type="password"
          placeholder="password"
          style={{ padding: "10px", marginRight: "30px" }}
          onChange={GetPassword}
        />
        <input
          type="password"
          placeholder="Confirm password"
          style={{ padding: "10px", marginRight: "30px" }}
          onChange={ConfirmPassword}
        />
        <p>{Errpassword}</p>
        <br /> <br />
        <button>Submit</button>
        <p>{Err}</p>
      </form>
    </div>
  );
}
