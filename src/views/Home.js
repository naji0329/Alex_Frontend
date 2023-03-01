import React from "react";
import { useTranslation } from "react-i18next";
import ProductsTable from "../components/section/products/ProductsTable";
import { useEffectOnce } from "../hook/useEffectOnce";

const Home = () => {
  const { t } = useTranslation();
  useEffectOnce(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  return (
    <>
      <div className="n-container">
        <ProductsTable />
      </div>
    </>
  );
};

export default Home;
