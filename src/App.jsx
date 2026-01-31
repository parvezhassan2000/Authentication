import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ChangePassword from './pages/ChangePassword';


function App() {
  return (
    <Layout>
      <Routes>

        <Route path="/" element={<HomePage />} />
      <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Layout>
  );
}

export default App;
