import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CatalougueLayout from './pages/CatalougueLayout';
import { useUserContext } from './context/UserContext';
import { ProtectedRoute } from './pages/ProtectedRoute';
import AddAddressPage from './pages/AddAddressPage';
import CompleteYourPayment from './pages/CompleteYourPayment';

const App = () => {
  const { isLoggedIn } = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path="/catalogue"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CatalougueLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-address"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddAddressPage onClose={() => { }} />
            </ProtectedRoute>
          }
        />
        <Route path='/complete-your-payment'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CompleteYourPayment />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App