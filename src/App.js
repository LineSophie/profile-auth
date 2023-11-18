import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/app-images/logoipsum-214.svg';
import LoginPage from './components/LoginPage/LoginPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProfileSettings from './components/ProfileSettings/ProfileSettings';
import { Route, Link, Routes, useNavigate  } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { signOutUser } from './handles/sign_out_user';
import { updateUserData } from './handles/update_user_data';
import { getUserData } from './handles/get_user_data';
import { getImagesForUser } from './handles/get_images_for_user';
import { uploadUserImage } from './handles/upload_user_Image';
import { deleteUserImg } from './handles/delete_user_img';

const auth = getAuth();

function App() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('home'); 

  const user = auth?.currentUser;
  const userUID = user?.uid;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userUID) {
          const data = await getUserData(userUID);
          setUserData(data || null);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
  
    fetchUserData();
  }, [userUID]);
  
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (userUID) {
        const imageUrls = await getImagesForUser(userUID);
        if (imageUrls.length > 0) {
          setProfileImgUrl(imageUrls[0]);
        }
      }
    };
    fetchProfileImage();
  }, [userUID]);

  // Functions
    const signOutUserClick = () => {
      signOutUser(() => {
        setLoginSuccess(false);
        navigate('/login-page');
      });
    };

  const updateNewUserData = (newUserData) => {
    setUserData(newUserData);
  };

  const updateUserProfileData = async (updatedData) => {
    if (userUID) {
      try {
        await updateUserData(userUID, updatedData);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  const uploadNewImg = async (selectedImage) => {
    await uploadUserImage(selectedImage, userUID);
    const imageUrls = await getImagesForUser(userUID);
    if (imageUrls.length > 0) {
      setProfileImgUrl(imageUrls[0]);
    }
  };

  const deleteUserImage = () => {
    deleteUserImg(userUID);
  };

  if (!loginSuccess) {
    return <LoginPage setLoginSuccessTrue={setLoginSuccess} loginSuccess={loginSuccess} />;
  }

  return (
    <div className="App">
      {loginSuccess && (
        <div>
          <nav className="navBar">
            <ul className="navList">
            <li>
              <img src={logo} alt=""></img>
              <button 
                title='Log Out' 
                onClick={signOutUserClick}>
                  <Link to="/login-page"><i className="fa fa-sign-out-alt"></i></Link>
              </button>

              <button 
                title='Settings' 
                className={`${activeTab === 'profile-settings' ? 'activeTab' : ''}`}
                onClick={() => handleTabClick('profile-settings')}
                >
                  <Link to="/profile-settings"><i className="fa fa-gear"></i></Link>
               </button>

              <button 
                className={activeTab === 'home' ? 'activeTab' : ''}
                onClick={() => handleTabClick('home')}
                ><Link to="/home">Home</Link>
             </button>

            </li>
            </ul>
          </nav>

          <Routes>
            {/* Profile Page */}
            <Route
              path="/home"
              element={<ProfilePage userData={userData} profileImgUrl={profileImgUrl} />}
            />
            
            {/* Profile Settings Page */}
            <Route
              path="/profile-settings"
              element={
                <ProfileSettings
                  updateUserProfileData={updateUserProfileData}
                  userData={userData}
                  updateNewUserData={updateNewUserData}
                  userUID={userUID}
                  profileImgUrl={profileImgUrl}
                  uploadNewImg={uploadNewImg}
                  deleteUserImage={deleteUserImage}
                  setProfileImgUrl={setProfileImgUrl}
                />
              }
            />

            {/* Login Page */}
            <Route
              path="/login-page"
              element={
                <LoginPage 
                  setLoginSuccessTrue={setLoginSuccess} 
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;