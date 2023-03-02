import React, { useEffect, useMemo, useState } from 'react';
import useProduct from '../../../hook/useProduct';
import { useEffectOnce } from '../../../hook/useEffectOnce';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

import {
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    GridReadyEvent,
} from 'ag-grid-community';

function ProductsTable() {


    const { getProducts } = useProduct();
    const [isTableLoading, setTableLoading] = useState(false);

    const [products, setProducts] = useState([]);

    const getProductsData = async () => {
        setTableLoading(true);
        const res = await getProducts();
        setProducts(res);
        setTableLoading(false);
    };

    useEffectOnce(() => {
        getProductsData();
    });

    const [rowData] = useState([
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxster", price: 72000 }
    ]);
    // agNumberColumnFilter
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'data', initialWidth: 200, initialPinned: 'left', sortable: true, filter: true },
        { field: 'rank2021', sortable: true },
        { field: 'discountCode', sortable: true, filter: 'agSetColumnFilter' },
        { field: 'discountedPrice', sortable: true, filter: 'agNumberColumnFilter' },
        { field: 'intishipping', sortable: true },
        { field: 'warrantyReturn', sortable: true },
        { field: 'leds', sortable: true },
        { field: 'multiwave', sortable: true },
        { field: 'pulse', sortable: true },
        { field: 'control', sortable: true },
        { field: 'peakPower', sortable: true },
        { field: 'av9', sortable: true },
        { field: 'totalPowerWatts', sortable: true },
        { field: 'perLedPrice', sortable: true },
        { field: 'perWattPrice', sortable: true },
        { field: 'emfissues', sortable: true },
        { field: 'flickerIssues', sortable: true },
        { field: 'sound', sortable: true },
    ]);




    return (
        <>
            <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                {
                    isTableLoading
                        ? <p className='text-center'>Loading...</p>
                        : <AgGridReact
                            rowData={products}
                            columnDefs={columnDefs}
                        />
                }
            </div>
        </>

    );
}

export default ProductsTable;