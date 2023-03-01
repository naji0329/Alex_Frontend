import React, { useState } from "react";
import useProduct from "../../../hook/useProduct";
import Table from "../../common/table/Table";
import { useEffectOnce } from "../../../hook/useEffectOnce";

function ProductsTable() {
  const { getProducts } = useProduct();
  const [isTableLoading, setTableLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const getAllowedTokensData = async () => {
    setTableLoading(true);
    const res = await getProducts();
    setProducts(res);
    setTableLoading(false);
  };

  useEffectOnce(() => {
    getAllowedTokensData();
  });

  const columns = [
    { name: "Data", selector: (row) => row.data },
    { name: "Rank 2021 Body Series", selector: (row) => row.rank2021 },
    { name: "Discount Code", selector: (row) => row.discountCode },
    { name: "Discounted Price", selector: (row) => row.discountedPrice },
    { name: "INTL shipping", selector: (row) => row.intishipping },
    { name: "Warranty Return", selector: (row) => row.warrantyReturn },
    { name: "LEDs", selector: (row) => row.leds },
    { name: "Multiwave", selector: (row) => row.multiwave },
    { name: "Pulse", selector: (row) => row.pulse },
    { name: "Control", selector: (row) => row.control },
    { name: "Peak Power", selector: (row) => row.peakPower },
    { name: "Av9", selector: (row) => row.av9 },
    { name: "Total Power Watts", selector: (row) => row.totalPowerWatts },
    { name: "$ per LED", selector: (row) => row.perLedPrice },
    { name: "$ per Watt", selector: (row) => row.perWattPrice },
    { name: "EMF Issues", selector: (row) => row.emfissues },
    { name: "Ficker Issues", selector: (row) => row.flickerIssues },
    { name: "Sound", selector: (row) => row.sound },
  ];

  return (
    <div className="py-5 sm:py-10">
      <Table
        data={products}
        columns={columns}
        isTableLoading={isTableLoading}
      />
    </div>
  );
}

export default ProductsTable;
