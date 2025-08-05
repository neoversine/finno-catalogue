import React, { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import PhoneOverlay from './components/PhoneOverlay';
import AddressModal from './components/AddressModal';
import ExcelReader from './components/ExcelReader';
import { ToastContainer } from 'react-toastify';

const App = () => {

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

  useEffect(() => {
    const saved = localStorage.getItem("userAddress");
    if (saved) {
      setAddress(JSON.parse(saved));
    }
  }, []);



  return (
    <div>
      {
        (showAddressModal) && <>
          {/* <PhoneOverlay setIsValidPhNumber={setIsValidPhNumber} isValidPhNumber={isValidPhNumber} phoneNumber={mobileNumber} setPhoneNumber={setMobileNumber} /> */}
          <AddressModal
            address={address}
            setAddress={setAddress}
            onConfirm={handleConfirm}
            onClose={() => setShowAddressModal(false)}
          />
        </>
      }
      <HomePage address={address} />
      <ToastContainer />
    </div>
  )
}

export default App