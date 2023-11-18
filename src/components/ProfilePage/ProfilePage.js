import React from 'react';
import styles from './ProfilePage.module.css';
import profileIMG from '../../assets/app-images/undraw_female_avatar_efig.svg';
import meetingImg from '../../assets/app-images/undraw_mail_sent_re_0ofv.svg';

function ProfilePage({ userData, profileImgUrl }) {

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.backgroundImgOverlay}>
        <div className={styles.backgroundImg}></div>
      </div>

      <div className={styles.profileHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.ImagePosition}>
            {profileImgUrl ? (
              <img className={styles.profileImg} src={profileImgUrl} alt='' />
            ) : (
              <img className={styles.profileImg} src={profileIMG} alt='' />
            )}
          </div>
        </div>

        <div className={styles.headerCenter}>
          <div className={styles.headline}>
            <h2>{userData.firstName} {userData.lastName}</h2>
          </div>
          {userData.userText && <p>{userData.userText}</p>}
          <div>
            <button className={styles.contactBtn}>Contact</button>
          </div>
        </div>
        
        <div className={styles.headerRight}>
          <div>
            {userData.phoneNr &&
              <p><i className='fa fa-phone'></i> {userData.phoneNr}</p>  
            }  

            {userData.contactMail &&
              <p><i className='fa fa-envelope'></i> {userData.contactMail}</p>  
            }    
          </div>
          <div> 
            {userData.linkedInProfile &&
              <span>
                <a href={userData.linkedInProfile} target={userData.linkedInProfile} className={styles.socialHandles}><i className="fa fa-linkedin-in"></i></a>
              </span>
            }
            {userData.facebookProfile &&
              <span>
                <a href={userData.facebookProfile} target={userData.facebookProfile} className={styles.socialHandles}><i className="fa fa-facebook"></i></a>
              </span>
            }
          </div>
        </div>
      </div>

      <div className={styles.mainProfile}>
        <div className={styles.mainProfileLeft}>
          <div className={styles.webLinks}>
            <h4>Websites</h4>

            {userData.youtube &&
              <a href={userData.youtube} target={userData.youtube}><i className="fa fa-youtube"></i> Youtube</a>
            }

            {userData.blog &&
              <a href={userData.blog} target={userData.blog}><i className="fa fa-newspaper-o"></i> Blog</a>
            }

            {userData.portfolio &&
              <a href={userData.portfolio} target={userData.portfolio}><i className="fa fa-image"></i> Portfolio</a>
            }
          </div>
        </div>

        <div className={styles.mainProfileCenter}>
          <div className={styles.mainCenterSection}>
            <div className={styles.headline}>
              <h3>About</h3>
              <hr />
              {userData.userBio && <p>{userData.userBio}</p>}
            </div>
          </div>

          <div className={styles.mainCenterSection}>
            <div className={styles.headline}>
              <h3>Skills</h3>
              <hr />
              <div className={styles.skillDiv}>
                {userData.skillset?.map((skill, index) => (
                  <div key={index} className={styles.skills}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.mainCenterSection}>
            <div className={styles.headline}>
              <h3>Other</h3>
              <hr />
              <p>Some Data</p>
            </div>
          </div>
        </div>

        <div className={styles.mainProfileRight}>
            <img className={styles.meetingImg} src={meetingImg} alt=''></img>
            <br></br>
            {userData.calendar &&
              <button className={styles.contactBtn}>
                <a href={userData.calendar} target={userData.calendar}>Schedule Meeting</a>
              </button>
            }
        </div>
        
      </div>
    </div>
  );
}

export default ProfilePage;