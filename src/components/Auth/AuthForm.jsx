import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const API_KEY = "AIzaSyBDyMEfWuUkwa13rZhBXc2C1cp4trMegvM";

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const switchAuthModeHandler = () => setIsLogin(prev => !prev);

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setIsLoading(true);
    setError(null);

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();
      console.log("Firebase response:", data);

      if (!response.ok) {
        console.log("Firebase authentication failed:", data);
        throw new Error(data.error?.message || 'Authentication failed!');
      }

      console.log("Storing token in context & localStorage:", data.idToken);
      authCtx.login(data.idToken);

    } catch (err) {
      console.error("Error during authentication:", err.message);
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>Email</label>
          <input type="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label>Password</label>
          <input type="password" required ref={passwordRef} />
        </div>
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <div className={classes.loader}></div>}
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
