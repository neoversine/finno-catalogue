import React, { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import PhoneOverlay from './components/PhoneOverlay';
import ExcelReader from './components/ExcelReader';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompleteYourPayment from './pages/CompleteYourPayment';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CataloguePage from './pages/CataloguePage';
import CatalougueLayout from './pages/CatalougueLayout';
import { useUserContext } from './context/UserContext';
import { ProtectedRoute } from './pages/ProtectedRoute';
import AddAddressPage from './pages/AddAddressPage';

const App = () => {
  const { isLoggedIn } = useUserContext();
  const [showAddressModal, setShowAddressModal] = useState(true);
  const [address, setAddress] = useState({
    flat: "",
    street: "",
    area: "",
    city: "",
    state: "",
    sector: "",
    pincode: ""
  });

  const handleConfirm = () => {
    console.log("Address confirmed:", address);

    // Save to localStorage
    localStorage.setItem("userAddress", JSON.stringify(address));

    setShowAddressModal(false);
  };

  // useEffect(() => {
  //   const saved = localStorage.getItem("userAddress");
  //   if (saved) {
  //     setAddress(JSON.parse(saved));
  //   }
  // }, []);



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<LandingPage />} />
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

        <Route path='/' element={
          <div>
            {
              (showAddressModal) ? <>
                {/* <PhoneOverlay setIsValidPhNumber={setIsValidPhNumber} isValidPhNumber={isValidPhNumber} phoneNumber={mobileNumber} setPhoneNumber={setMobileNumber} /> */}
                {/* <AddressModal
                  address={address}
                  setAddress={setAddress}
                  onConfirm={handleConfirm}
                  onClose={() => setShowAddressModal(false)}
                /> */}
              </> :
                <HomePage address={address} />
            }
          </div>
        } />

        <Route path='/complete-your-payment' element={<CompleteYourPayment />} />

      </Routes>

      <ToastContainer />
    </BrowserRouter>
  )
}

export default App