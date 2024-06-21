import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../navigation/constants";
import { useRef, useState } from 'react';
import { auth } from "../../../firebase-config";
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
  const navigate = useNavigate();

  const [_error, updateError] = useState('')

  const formRef = useRef(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e, formRef) => {
    e.preventDefault();
    setIsLoading(true);
    const { email: { value: email }, password: { value: password } } = formRef.current;
    setIsLoading(false)
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('admin', user);
      // console.log("user", user);
      navigate(SCREENS.DASHBOARD);
    } catch (error) {
      alert("Error signing in");
      console.log(error.message)

      if (error.message.includes('auth/invalid-credential')) updateError('incorrect email')
    }
  }

  return (
    <div className="card-body">
      <form ref={formRef} method="POST" onSubmit={(e) => handleSubmit(e, formRef)} className="needs-validation" noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" required type="email" className="form-control" name="email" tabIndex={1} autoFocus />
          {_error.length && (<small className="text-danger">
            Incorrect email
          </small >)}
        </div>
        <div className="form-group">
          <div className="d-block">
            <label htmlFor="password" className="control-label">Password</label>
            <div className="float-right">
              <a href="auth-forgot-password.html" className="text-small">
                Forgot Password?
              </a>
            </div>
          </div>
          <input id="password" type="password" className="form-control" name="password" tabIndex={2} required />
          {_error.length && (<small className="text-danger">
            Incorrect password
          </small >)}
        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" name="remember" className="custom-control-input" tabIndex={3} id="remember-me" />
            <label className="custom-control-label" htmlFor="remember-me">Remember Me</label>
          </div>
        </div>
        <div className="form-group">
          <button disabled={isLoading} type="submit" className="btn btn-primary btn-lg btn-block" tabIndex={4}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;