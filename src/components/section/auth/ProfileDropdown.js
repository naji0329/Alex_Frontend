import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import useLoading from "../../../hook/useLoading";
import Dropdown from "../../common/dropdown/Dropdown";

function ProfileDropdown() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const { logout } = useAuth();
  const { setLoading } = useLoading();

  const onLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <div>
      <Dropdown
        Header={
          <div className="flex justify-end gap-2 items-center">
            <img
              src={user && user.avatar}
              alt=""
              className="w-8 rounded-full"
            />
            <p className="cursor-pointer text-lg text-right">
              {user && user?.userName}
            </p>
            <KeyboardArrowDownIcon />
          </div>
        }
        items={[
          {
            content: (
              <p
                className="cursor-pointer text-sm text-center"
                onClick={() => {
                  navigate("/user/profile");
                }}
              >
                Profile
              </p>
            ),
          },
          {
            content: (
              <p
                className="cursor-pointer text-sm text-center"
                onClick={onLogout}
              >
                Logout
              </p>
            ),
          },
        ]}
      />
    </div>
  );
}

export default ProfileDropdown;
