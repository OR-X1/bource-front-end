import { Link, useNavigate } from "react-router-dom";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
import axios from 'axios';
import { useState } from 'react';


const Register = () => {
    const [name_en, setName_en] = useState('');

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [errormail, setErrormail] = useState('');
    const [errorpass, setErrorpass] = useState('');
    const [errorpassword_conf, setErrorpassword_conf] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
        const [isloadingsubmit, setIsLoadingsubmit] = useState(false);
    const handleSubmit = (e) => {
        // e.presist();
        e.preventDefault();
        setIsLoadingsubmit(true);

        axios.defaults.withCredentials = true
        // CSRF COOKIE
        axios.get("http://localhost:8000/sanctum/csrf-cookie").then(
          (response) => {
           
            // SIGNUP / REGISTER
            axios.post("http://localhost:8000/api/register", {
                name: name_en,
                password: password,
                email: email,
                password_confirmation: passwordConfirmation,
              }).then(response => {
                            
                        
                        setErrormail('')
                        setErrorpass('')
                        setError('')
                        setIsLoadingsubmit(false);
                        localStorage.setItem('auth_token',response.data.token)
                        // localStorage.setItem('auth_user',response.data.user)
                        localStorage.setItem('auth_user', JSON.stringify(response.data.user))
                        navigate('/profileregister')

                }).catch(error =>{
                    setIsLoadingsubmit(false);
                   
                    if(error.response.status === 401){
                        setError(error.response.data.message)
                        
                    }
                    if(error.response.data.errors){
                        setErrormail(error.response.data.errors.email)
                        setErrorpass(error.response.data.errors.password)
                        setErrorpassword_conf(error.response.data.errors.password)
                    }
                })
          },
        )
      }
   
    return (

<div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-5 col-xl-4 my-5">

        <h1 class="display-4 text-center mb-3">
            Sign up
        </h1>

        <p class="text-muted text-center mb-5">
          Get account and ccess to our dashboard.
        </p>

        <form  onSubmit={handleSubmit}>
        <span className="text-danger">{error}</span>
        <div class="form-group">

        <label class="form-label">
        Name
        </label>

        <input  type="text" class="form-control "  onChange={(e) => setName_en(e.target.value)} value={name_en}  placeholder="your name" required />
        

        </div>

          <div class="form-group">

            <label class="form-label">
              Email Address
            </label>

            <input  type="email" class="form-control "  onChange={(e) => setEmail(e.target.value)} value={email} placeholder="name@address.com" required />
            <span className="text-danger">{errormail}</span>

          </div>

          <div class="form-group">
            <div class="row">
              <div class="col">

                <label class="form-label">
                  Password
                </label>

              </div>
              <div class="col-auto">

                

              </div>
            </div> 

            <div class="input-group input-group-merge">


              <input  type="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
              <span className="text-danger">{errorpass}</span>
             
              <span class="input-group-text">
                <i class="fe fe-eye"></i>
              </span>

            </div>
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col">

                <label class="form-label">
                Re-Password
                </label>

              </div>
              <div class="col-auto">

                

              </div>
            </div> 

            <div class="input-group input-group-merge">


              <input  type="password" class="form-control" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} placeholder="Enter your password" required />
              <span className="text-danger">{errorpassword_conf}</span>
             
              <span class="input-group-text">
                <i class="fe fe-eye"></i>
              </span>

            </div>
          </div>

          <button type="submit" class="btn btn-lg w-100 btn-primary mb-3" disabled={isloadingsubmit}>
          {isloadingsubmit ? 'loading...' : 'Sign up'}
          </button>

          <div class="text-center">
            <small class="text-muted text-center">
            Already have an account? <Link to="/ligin">Log in.</Link>.
            </small>
          </div>

        </form>

      </div>
    </div> 
  </div> 


    );
}
 
export default Register;