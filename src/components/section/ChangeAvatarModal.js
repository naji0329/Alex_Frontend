import React, { useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../../hook/useAuth";
import useLoading from "../../hook/useLoading";

export default function ChangeAvatarModal({ toggleChangeAvatarModal }) {
  const { updateProfile } = useAuth();
  const { setLoading } = useLoading();
  const user = useSelector((state) => state.auth.user);
  const [preImg, setPreImg] = useState(
    user.avatar
      ? user.avatar
      : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
  );
  const [file, setFile] = useState();

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    // Assuming only image
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setPreImg(reader.result);
    };
  };

  async function changeAvatar() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      await updateProfile(formData);
      setLoading(false);
      toggleChangeAvatarModal(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none">
        <div className="relative max-w-[400px]  w-[80%] m-auto my-6 mx-auto">
          {/* content */}
          <div className="border border-white/50 rounded-lg shadow-lg relative flex flex-col bg-[#0B0B0F] outline-none focus:outline-none">
            {/* header */}
            <div className="p-4">
              <div className="flex justify-between items-center">
                <p className="font-medium text-white">Change User Avatar</p>
                <p
                  className="font-bold  text-white text-2xl mb-3 cursor-pointer"
                  onClick={() => toggleChangeAvatarModal(false)}
                >
                  ×
                </p>
              </div>
              <div>
                <div
                  className="border-[#949494] w-full border-2 mt-3 rounded-lg p-2 border-dashed cursor-pointer"
                  onClick={handleClick}
                >
                  <input
                    type={"file"}
                    className="hidden"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                  />
                  <img
                    src={preImg}
                    alt=""
                    className="m-auto max-h-64 max-w-1/2"
                  />
                  <div className={`${preImg ? "hidden" : ""} p-10`}>
                    <img src="/img/upload_nft.png" alt="" className="m-auto " />
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  <p
                    className="border border-white mt-2 text-center px-4 py-2 cursor-pointer w-full flex justify-center text-white items-center"
                    onClick={() => {
                      toggleChangeAvatarModal(false);
                    }}
                  >
                    Cancel
                  </p>
                  <div className="text-center bg-gradient-to-r from-[#5B46DF] to-[#BA4DF9] px-4 py-2 cursor-pointer  mt-2 w-full">
                    <p
                      className="w-full text-white"
                      onClick={() => {
                        changeAvatar();
                      }}
                    >
                      Change
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-20 bg-black"></div>
    </>
  );
}
