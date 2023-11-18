import React, { useState, useEffect } from "react";
import styles from './ProfileSettings.module.css';
import ProfileImg from '../../assets/app-images/undraw_female_avatar_efig.svg';
import { updateUserPassword } from '../../handles/update_user_password';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 

function ProfileSettings({
  updateUserProfileData,
  userData,
  updateNewUserData,
  profileImgUrl,
  uploadNewImg,
  deleteUserImage,
  setProfileImgUrl
}) {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userText: '',
    contactMail: '',
    phoneNr: '',
    calendar: '',
    linkedInProfile: '',
    facebookProfile: '',
    youtube: '',
    blog: '',
    portfolio: '',
    userBio: '',
    skillset: [],
    newSkill: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const selectedNewImg = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    const previewImage = document.getElementById('previewImage');
    previewImage.src = imageUrl;
  };

  const [activeTab, setActiveTab] = useState('userInfo');
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setFormData({ ...userData, skillset: userData.skillset || [] });
  }, [userData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "skillset") {
      setFormData((prevData) => ({
        ...prevData,
        newSkill: value, 
        skillset: [...prevData.skillset],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddSkill = () => {
    const { newSkill } = formData;
    if (newSkill && newSkill.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        skillset: [...prevData.skillset, newSkill.trim()],
        newSkill: '',
      }));
    }
  };

  const handleDeleteSkill = (index) => {
    const { skillset } = formData;
    setFormData((prevData) => ({
      ...prevData,
      skillset: skillset.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteUserProfileImg = () => {

    setProfileImgUrl(null);
    deleteUserImage();
    const previewImage = document.getElementById('previewImage');
    previewImage.src = ProfileImg;
    Swal.fire({
      title: 'Success!',
      text: 'Your image has been successfully deleted!',
      icon: 'success',
      timer: 5000,
      showConfirmButton: false,
    });
  };

  const handleSaveData = async () => {
    updateUserProfileData(formData);
    updateNewUserData(formData);
    Swal.fire({
      title: 'Success!',
      text: 'Your data has been successfully updated.',
      icon: 'success',
      timer: 5000,
      showConfirmButton: false,
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveNewPassword = async () => {
    const { newPassword, confirmPassword, oldPassword } = passwordData;

    if (newPassword.trim() === '') {
      Swal.fire({
        title: 'Alert!',
        text: 'Please enter a new password.',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: false,
      });
      return;
    }

    if (newPassword === confirmPassword) {
      if (oldPassword.trim() === '') {
        Swal.fire({
          title: 'Alert!',
          text: 'Please enter your old password.',
          icon: 'warning',
          timer: 5000,
          showConfirmButton: false,
        });
        return;
      }

      try {
        await updateUserPassword(newPassword, oldPassword);
        Swal.fire({
          title: 'Success!',
          text: 'Password updated successfully!',
          icon: 'success',
          timer: 5000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error('Error updating password:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while updating the password.',
          icon: 'error',
          showConfirmButton: false,
        });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Your passwords do not match. Try again.',
        icon: 'error',
        showConfirmButton: false,
      });
    }
  };


  const handleSaveUserImg = () => {
      uploadNewImg(selectedImage);
      setSelectedImage(null);
      Swal.fire({
        title: 'Success!',
        text: 'Your image has been successfully uploaded!',
        icon: 'success',
        timer: 5000,
        showConfirmButton: false,
      });
  }

  const handleCancelUpload = () => {
    setSelectedImage(null);
    const previewImage = document.getElementById('previewImage');
    previewImage.src = profileImgUrl;
  }

  return (
    <div className={styles.profileSettingsContainer}>
      <div className={styles.profileSettingsColumn}>

        <div className={styles.editImageSection}>
          <h2>{formData.firstName} {formData.lastName}</h2>
          <div className={styles.imageDiv}>
            <img id="previewImage" className={styles.profileImg} src={profileImgUrl || ProfileImg} alt='' />
          </div>
          {!selectedImage ? (
            <>
                <label htmlFor="newProfileImage" className={styles.customFileBtn}>
                Change Image
              </label>
              <input
                id="newProfileImage"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={selectedNewImg}
              />
              </>
            ) : (
              <>
                <button className={styles.customFileBtn} onClick={handleSaveUserImg}>Save </button>
                </>
            )}

          {!selectedImage ? (
            <>
                  <button 
                    className={styles.deleteImgBtn} 
                    onClick={handleDeleteUserProfileImg}>
                    Delete Image
                  </button>

              </>
            ) : (
              <>
                <button 
                  className={styles.deleteImgBtn} 
                  onClick={handleCancelUpload}>
                  Cancel
                </button>
              </>
            )}

          <div className={styles.infoText}>
            <p>Upload a new image and click "Save". Images will automatically be resized. Maximum upload size is 1 MB.</p>
          </div>
        </div>

        <div className={styles.editSettingsSection}>
          <div className={styles.editProfileHeader}>
            <h2>Edit Profile</h2>
            <button
              className={`${styles.settingsBtn} ${activeTab === 'userInfo' ? styles.activeTab : ''}`}
              onClick={() => handleTabClick('userInfo')}
            >
              User Info
            </button>
            <button
              className={`${styles.settingsBtn} ${activeTab === 'security' ? styles.activeTab : ''}`}
              onClick={() => handleTabClick('security')}
            >
              Security
            </button>
          </div>

          {/*Active Tab User Info */}
          {activeTab === 'userInfo' && (
            <>
              <div className={styles.profileSubSection}>
                <h3>Basic Information</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit tempor incididunt</p>

                <div className={styles.fullNameDiv}>
                  <div className={styles.fullNameElement}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.fullNameElement}>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <label htmlFor="userText">One Liner</label>
                <textarea
                  id="userText"
                  name="userText"
                  rows="2"
                  value={formData.userText || ''}
                  onChange={handleInputChange}
                >
                </textarea>

                <label htmlFor="userBio">About</label>
                <textarea
                  id="userBio"
                  name="userBio"
                  rows="5"
                  value={formData.userBio || ''}
                  onChange={handleInputChange}
                >
                </textarea>
              </div>

              <div className={styles.profileSubSection}>
                <h3>Contact Information</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit tempor incididunt</p>

                <label htmlFor="contactMail">Contact Mail</label>
                    <input
                      id="contactMail"
                      name="contactMail"
                      type="text"
                      value={formData.contactMail || ''}
                      onChange={handleInputChange}
                    />

              <label htmlFor="phoneNr">Phone Number</label>
                    <input
                      id="phoneNr"
                      name="phoneNr"
                      type="text"
                      value={formData.phoneNr || ''}
                      onChange={handleInputChange}
                    />

              <label htmlFor="calendar">Calendar Link</label>
                <input
                  id="calendar"
                  name="calendar"
                  type="text"
                  pattern="https://.*"
                  value={formData.calendar || ''}
                  onChange={handleInputChange}
                />
                <label htmlFor="linkedInProfile">LinkedIn</label>
                <input
                  id="linkedInProfile"
                  name="linkedInProfile"
                  type="text"
                  pattern="https://.*"
                  value={formData.linkedInProfile || ''}
                  onChange={handleInputChange}
                />
                <label htmlFor="facebookProfile">Facebook</label>
                <input
                  id="facebookProfile"
                  name="facebookProfile"
                  type="text"
                  pattern="https://.*"
                  value={formData.facebookProfile || ''}
                  onChange={handleInputChange}
                />

              </div>

              <div className={styles.profileSubSection}>
                <h3>Websites</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit tempor incididunt</p>

                <label htmlFor="youtube">Youtube</label>
                <input
                  id="youtube"
                  name="youtube"
                  type="text"
                  pattern="https://.*"
                  value={formData.youtube || ''}
                  onChange={handleInputChange}
                />
                  <label htmlFor="blog">Blog</label>
                <input
                  id="blog"
                  name="blog"
                  type="text"
                  pattern="https://.*"
                  value={formData.blog || ''}
                  onChange={handleInputChange}
                />
                  <label htmlFor="portfolio">Portfolio</label>
                <input
                  id="portfolio"
                  name="portfolio"
                  type="text"
                  pattern="https://.*"
                  value={formData.portfolio || ''}
                  onChange={handleInputChange}
                />

                </div>

              <div className={styles.profileSubSection}>
                <h3>Other Information</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit tempor incididunt</p>
    
                <div className={styles.inputContainer}>
                  <label htmlFor="skillset">Skills</label>
                  <div className={styles.tagInputContainer}>
                    <input
                      id="skillset"
                      name="skillset"
                      type="text"
                      value={formData.newSkill || ''}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    {formData.skillset.map((skill, index) => (
                      <div key={index} className={styles.skillTag}>
                        {skill}
                        <button
                          className={styles.deleteSkillBtn}
                          onClick={() => handleDeleteSkill(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              <button className={styles.saveChangesBtn} onClick={handleSaveData}>Save Changes</button>
            </>
          )}

          {/*Active Tab Security*/}
          {activeTab === 'security' &&
            <>
              <div className={styles.profileSubSection}>

                <label htmlFor="oldPassword">Old Password</label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  value={passwordData.oldPassword || ''}
                  onChange={handlePasswordChange}
                />

                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword || ''}
                  onChange={handlePasswordChange}
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword || ''}
                  onChange={handlePasswordChange}
                />
              </div>
              <button className={styles.saveChangesBtn} onClick={handleSaveNewPassword}>Save Changes</button>
            </>
          }

        </div>

      </div>

    </div>
  );
}

export default ProfileSettings;