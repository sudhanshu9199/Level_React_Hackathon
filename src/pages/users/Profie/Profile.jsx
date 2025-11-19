import style from './Profile.module.scss';
import shraddhaNewModel from '../../../assets/Model_Images/Shraddha_newModel1.jpg';
import sudhanshuImg from '../../../assets/Model_Images/SudhanshuImg.png';
import { useSelector } from 'react-redux';
import useLogout from '../../../Auth/useLogout';
const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const logout = useLogout();
  return (
    <div className={style.profileContainer}>
        <div className={style.left}>
            <div className={style.weightStyle}>
                <img src={sudhanshuImg} alt="" className={style.pic} />
                <img src={shraddhaNewModel} alt="" className={style.Smodel} />
                <div className={style.userDetails}>
                    <div className={style.name}>Eleanor Vance</div>
                    <div className={style.level}>Platinum Member</div>
                </div>
            </div>
            <div onClick={logout} className={style.signOuts}>
                <i className="ri-logout-box-r-line"></i>
                <p>Logout</p>
            </div>
        </div>
        <div className={style.right}>
        <div className={style.headText}>
            <h1>Welcome, <span>Sudhanshu</span>🙏</h1>
        <p>Here you can manage your profile, orders.</p>
        </div>

        <div className={style.ContactInfo}>
            <div className={style.header}>
                <h3>Contact Information</h3>
                <div className={style.edits}>
                    <i className="ri-pencil-line"></i>
                    <p>Edit</p>
                </div>
            </div>
            <div className={style.infos}>
                <div className={style.names}>
                    <p className={style.legend}>Full Name</p>
                    <input type="text" placeholder='User Name'/>
                </div>
                <div className={style.emails}>
                    <p className={style.legend}>Email Address</p>
                    <input type="email" placeholder='user@email.id'/>
                </div>
                <div className={style.phones}>
                    <p className={style.legend}>Phone Number</p>
                    <input type="number" placeholder='99xxxxxx10'/>
                </div>
                <div className={style.addresses}>
                    <p className={style.legend}>Address</p>
                    <input type="text" placeholder='Your, full address'/>
                </div>
            </div>
        </div>
            <div className={style.passwordDiv}>
                <div className={style.header}>
                    <h3>Password</h3>
                    <div className={style.edits}>
                    <i className="ri-pencil-line"></i>
                    <p>Change</p>
                </div>
                </div>

                <div className={style.passwordArea}>
                <input type="password" placeholder='**********'/>
                </div>
            </div>
            <div className={style.saveBtnArea}>
                <button>Save Changes</button>
            </div>
        </div>

    </div>
  )
}

export default Profile