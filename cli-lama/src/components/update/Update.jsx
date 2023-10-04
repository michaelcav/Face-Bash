import { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const queryClient = useQueryClient();

  const uploadCover = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const uploadProfile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Crie novos objetos URL quando as imagens forem alteradas
    if (cover) {
      setCoverUrl(URL.createObjectURL(cover));
    }
    if (profile) {
      setProfileUrl(URL.createObjectURL(profile));
    }
  }, [cover, profile]);

  const [coverUrl, setCoverUrl] = useState(
    cover ? URL.createObjectURL(cover) : `/upload/${user.coverPic}`
  );
  const [profileUrl, setProfileUrl] = useState(
    profile ? URL.createObjectURL(profile) : `/upload/${user.profilePic}`
  );

  const handleChange = (e) => {
    setTexts((prevTexts) => ({
      ...prevTexts,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coverUrl = cover ? await uploadCover(cover) : user.coverPic;
    const profileUrl = profile ? await uploadProfile(profile) : user.profilePic;

    if (cover || profile) {
      const updatedUser = { ...texts, coverPic: coverUrl, profilePic: profileUrl };
      mutation.mutate(updatedUser);
    }

    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img src={coverUrl} alt="" />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img src={profileUrl} alt="" />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
