// import { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import classes from './MainNavigation.module.css';
// import AuthContext from '../../store/auth-context';

// const MainNavigation = () => {
//   const authCtx = useContext(AuthContext);

//   return (
//     <header className={classes.header}>
//       <Link to="/">
//         <div className={classes.logo}>React Auth</div>
//       </Link>
//       <nav>
//         <ul>
//           {!authCtx.isLoggedIn && (
//             <li>
//               <Link to="/auth">Login</Link>
//             </li>
//           )}
//           {authCtx.isLoggedIn && (
//             <>
//               <li>
//                 <Link to="/profile">Profile</Link>
//               </li>
//               <li>
//                 <button onClick={authCtx.logout}>Logout</button>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// };


// export default MainNavigation;
import { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
          )}

          {authCtx.isLoggedIn && (
            <Fragment>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>

              <li>
                <NavLink to="/change-password">Change Password</NavLink>
              </li>

              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

