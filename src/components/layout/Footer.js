import React from "react";
import { useTranslation } from "react-i18next";
import "./footer.css";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="footer bg-white dark:bg-[#121318]  text-[#47484E] dark:text-white">
        <div className="n-container">
          <div className="py-4 sm:flex justify-between items-center">
            <div className="flex justify-start gap-4 items-center text-center sm:text-right text-sm sm:text-base text-[#101115] dark:text-white">
              <img src="/img/logo.png" className="h-20 m-auto sm:m-0" alt="" />
              <p>© 2023 Football World Communityt. All rights reserved</p>
            </div>
            <div className="flex gap-2 justify-center mt-4 sm:mt-0">
              <img
                src="/img/socials/reddit.png"
                width={"40px"}
                height={"40px"}
                alt=""
              />
              <img
                width={"40px"}
                height={"40px"}
                src="/img/socials/facebook.png"
                alt=""
              />
              <img
                width={"40px"}
                height={"40px"}
                src="/img/socials/twitter.png"
                alt=""
              />
              <img
                width={"40px"}
                height={"40px"}
                src="/img/socials/instagram.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
