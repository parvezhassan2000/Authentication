import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error('Authentication failed!')), 1500)
      );
    } catch (err) {
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
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}

          {isLoading && <div className={classes.loader}></div>}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
