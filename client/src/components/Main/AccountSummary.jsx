import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import {AiFillEye} from "react-icons/ai"
import {AiFillEyeInvisible} from "react-icons/ai"
import axios from "axios";




const AccountSummary = (props) => {
  let { id } = useParams();
  const [error, setError] = useState("");
  
  // 


  const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange =(evnt)=>{
        setPasswordInput(evnt.target.value);
    }
    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }


    // 

  console.log(`id on the accountsummary page ${id}`);

  const [oldrecord, setoldRecord] = useState([]);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/edituserdet/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setoldRecord(result);
        setfirstname(result.firstName);
        setemail(result.email);
        setlastname(result.lastName);
        setPasswordInput(result.password);
        // setpassword(result.password);
      });
  }, [id]);


 

  let smallShad = {
    borderRadius: "10px",
    width: "132%",
    height: "100%",
    marginTop: "-150px",
  };
  let h5Style = { color: "black" };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(document.cookie)
      const url = `http://localhost:8080/api/edituserdet/${id}`;
      const { data: res } = await axios.post(url, {
        id:id,
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: passwordInput,
      });
      // props.setRec(data};
      // props.setRec(res.data);
      // navigate("/status");
      console.log(`this message ${res.message}`);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <div className="shadow p-3  bg-body" style={smallShad}>
        <div>
          <h5 className="my-2" style={h5Style}>
            Account Information!
          </h5>
        </div>
        {/* <div className="text-center my-5 p-5">
          <p className="p-5">
          <b><i> Name:</i></b> {oldrecord.firstName + " " + oldrecord.lastName}
            <br />
            <i><b> Email:</b></i> {oldrecord.email}
          </p>

        </div> */}
        <div className="row p-4">
          <div className="p-4 col-lg-6">
            <div>
              <label className="form-label">First Name</label>
              <input className="form-control" type="text" defaultValue={oldrecord.firstName}
                  onChange={(e) => setfirstname(e.target.value)}
                  required />
            </div>
            <div>
              <label className="form-label">Enter New Password</label>
              {/* <input className="form-control" type="paasword" defaultValue={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required /> */}
              <input type={passwordType} onChange={handlePasswordChange} value={passwordInput} name="password" class="form-control" placeholder="Password" />
                    <div className="input-group-btn">
                     <button className="btn" onClick={togglePassword}>
                     { passwordType==="password"? <AiFillEyeInvisible /> :<AiFillEye /> }
                     </button>
                    </div>
                    <p>Recommended Password</p>

            </div>
          </div>
          <div className="p-4 col-lg-6">
            <div>
              <label className="form-label">Last Name</label>
              <input className="form-control" type="text" defaultValue={oldrecord.lastName}
                  onChange={(e) => setlastname(e.target.value)}
                  required />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input className="form-control" type="email" defaultValue={oldrecord.email}
                  onChange={(e) => setemail(e.target.value)}
                  required />
            </div>
          </div>
        </div>
        <div className="text-center">
        <button className={styles.white_btn} onClick={handleSubmit}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
