
import { useRef, useState, useContext } from 'react';
import AuthContext from '../store/auth-context';
import classes from './ChangePassword.module.css';

const ChangePassword = () => {
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredNewPassword = newPasswordRef.current.value;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBDyMEfWuUkwa13rZhBXc2C1cp4trMegvM',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredNewPassword,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Password change failed');
      }

      // 🔄 Update token (Firebase returns a new token)
      authCtx.login(data.idToken);
      setSuccess(true);
      newPasswordRef.current.value = '';

    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>Change Password</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>New Password</label>
          <input
            type="password"
            minLength="6"
            required
            ref={newPasswordRef}
          />
        </div>

        {error && <p className={classes.error}>{error}</p>}
        {success && <p className={classes.success}>Password updated successfully!</p>}

        <div className={classes.actions}>
          {!isLoading && <button>Change Password</button>}
          {isLoading && <p>Updating...</p>}
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;
