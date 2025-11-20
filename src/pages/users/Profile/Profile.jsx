import style from "./Profile.module.scss";
import shraddhaNewModel from "../../../assets/Model_Images/Shraddha_newModel1.jpg";
import sudhanshuImg from "../../../assets/Model_Images/SudhanshuImg.png";
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../../../Auth/useLogout";
import { useMemo, useState, useEffect } from "react";
import { updateProfile } from "../../../Redux/Slice/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const logout = useLogout();

  const initial = useMemo(() => {
    const name =
      user?.name ||
      `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
      "";
    return {
      name,
      email: user?.email || user?.emailAddress || "",
      phone: user?.phone || user?.mobile || "",
      address: user?.address || user?.location || "",
    };
  }, [user]);
  const [form, setform] = useState(initial);
  const [editMode, seteditMode] = useState(false);
  const [saving, setsaving] = useState(false);
  const [message, setmessage] = useState("");

  useEffect(() => setform(initial), [initial]);

  const hasChanges = useMemo(() => {
    return (
      form.name !== initial.name ||
      form.phone !== initial.phone ||
      form.address !== initial.address
    );
  }, [form, initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((s) => ({ ...s, [name]: value }));
    setmessage("");
  };

  const validate = () => {
    if (!form.name.trim()) {
      setmessage("Name cannot be empty.");
      return false;
    }
    if (form.phone && !/^\+?[0-9\s\-]{7,15}$/.test(form.phone)) {
      setmessage("Please enter a valid phone number.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    if (!hasChanges) {
      setmessage("No changes to save");
      return;
    }

    try {
      setsaving(true);
      // optimistic UI update
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      };
      dispatch(updateProfile(payload));
      seteditMode(false);
      setmessage("Profile update successfully✅");
    } catch (err) {
      console.log("Save profile failed:", err);
      setmessage("Failed to save. Try again.");
    } finally {
      setsaving(false);
    }
  };

  const handleCancel = () => {
    setform(initial);
    seteditMode(false);
    setmessage("");
  };
  return (
    <div className={style.profileContainer}>
      <div className={style.left}>
        <div className={style.weightStyle}>
          <img src={sudhanshuImg} alt="user_Profile" className={style.pic} />
          <img src={shraddhaNewModel} alt="" className={style.Smodel} />
          <div className={style.userDetails}>
            <div className={style.name}>{form.name || "Default Name"}</div>
            <div className={style.level}>Platinum Member</div>
          </div>
        </div>
        <div onClick={logout} className={style.signOuts} role="button">
          <i className="ri-logout-box-r-line"></i>
          <p>Logout</p>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.headText}>
          <h1>
            Welcome, <span>{form.name || "User"}</span>🙏
          </h1>
          <p>Here you can manage your profile, orders.</p>
        </div>

        <div className={style.ContactInfo}>
          <div className={style.header}>
            <h3>Contact Information</h3>
            <div
              className={style.edits}
              aria-hidden="true"
              onClick={() => {
                seteditMode(true);
                setmessage("");
              }}
              role="button"
            >
              <i className="ri-pencil-line"></i>
              <p>Edit</p>
            </div>
          </div>
          <div className={style.infos}>
            <div className={style.names}>
              <label className={style.legend} htmlFor="name">
                Full Name
              </label>
              <br />
              <input
                id="name"
                name="name"
                type="text"
                placeholder="User Name"
                value={form.name}
                onChange={handleChange}
                readOnly={!editMode}
                aria-readonly={!editMode}
                autoComplete="name"
                className={editMode ? style.editable : style.readOnly}
              />
            </div>
            <div className={style.emails}>
              <label className={style.legend} htmlFor="email">
                Email Address
              </label>
              <br />
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                readOnly
                aria-readonly="true"
                placeholder="user@email.id"
              />
            </div>
            <div className={style.phones}>
              <label className={style.legend} htmlFor="phone">
                Phone Number
              </label>
              <br />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                readOnly={!editMode}
                aria-readonly={!editMode}
                placeholder="99xxxxxx10"
                className={editMode ? style.editable : style.readOnly}
              />
            </div>
            <div className={style.addresses}>
              <label className={style.legend} htmlFor="address">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                readOnly={!editMode}
                aria-readonly={!editMode}
                placeholder="Your, full address"
              />
            </div>
          </div>
        </div>
        <div className={style.passwordDiv}>
          <div className={style.header}>
            <h3>Password</h3>
            <div className={style.edits} aria-hidden="true">
              <i className="ri-pencil-line"></i>
              <p>Change</p>
            </div>
          </div>

          <div className={style.passwordArea}>
            <input
              type="password"
              value="••••••••"
              readOnly
              aria-readonly="true"
              placeholder="**********"
            />
          </div>
        </div>
        <div className={style.saveBtnArea}>
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                aria-disabled={saving || !hasChanges}
                className={style.saveBtn}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button onClick={handleCancel} className={style.cancelBtn}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => seteditMode(true)} className={style.editBtn}>
              Edit Profile
            </button>
          )}
        </div>
        {message && <div className={style.message}>{message}</div>}
      </div>
    </div>
  );
};

export default Profile;
