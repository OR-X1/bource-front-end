import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";

const  Login = () => {
    let navigate= useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [errormail, setErrormail] = useState('');
    const [error, setError] = useState('');
    const [errorpass, setErrorpass] = useState('');

    // const history = useHistory()
    const [isloadingsubmit, setIsLoadingsubmit] = useState(false);
            const handleSubmit = e => {
                e.preventDefault();
                setIsLoadingsubmit(true);
                axios.defaults.withCredentials = true;
                axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then(response => {
                    axios.post('http://localhost:8000/api/login', {
                        email: email,
                        password: password,
                    }).then(response => {
                            setErrormail('')
                            setErrorpass('')
                            setError('')
                            localStorage.setItem('auth_token',response.data.token)
                            // localStorage.setItem('auth_user',response.data.user)
                            localStorage.setItem('auth_user', JSON.stringify(response.data.user))
                            setIsLoadingsubmit(false);
                            navigate('/')
                 

                    }).catch(error =>{
                        setIsLoadingsubmit(false);
                        // console.log(error.response.data.message);
                        if(error.response.status === 401){
                            setError(error.response.data.message)
                            
                        }
                        if(error.response.data.errors){
                            setErrormail(error.response.data.errors.email)
                            setErrorpass(error.response.data.errors.password)
                        }
                    }
                    )
                });
            }
   
    return (
        <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-5 col-xl-4 my-5">

        <h1 class="display-4 text-center mb-3">
          Sign in
        </h1>

        <p class="text-muted text-center mb-5">
          Access to our dashboard.
        </p>

        <form  onSubmit={handleSubmit}>
            
          <div class="form-group">

            <label class="form-label">
              Email Address
            </label>

            <input id="email" type="email" class="form-control "  value={email}  onChange={e => setEmail(e.target.value)}  placeholder="name@address.com" required />
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


              <input id="password" type="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
              <span className="text-danger">{errorpass}</span>
             
              <span class="input-group-text">
                <i class="fe fe-eye"></i>
              </span>

            </div>
          </div>

          <button type="submit" class="btn btn-lg w-100 btn-primary mb-3" disabled={isloadingsubmit}>
          {isloadingsubmit ? 'loading...' : 'Sing in'}
          </button>

          <div class="text-center">
            <small class="text-muted text-center">
              Don't have an account yet? <Link to="/register">Sign up</Link>.
            </small>
          </div>

        </form>

      </div>
    </div> 
  </div> 
    );
}
 
export default Login;