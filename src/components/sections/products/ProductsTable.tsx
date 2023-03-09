import React, { useCallback, useMemo, useRef, useState } from 'react';
import useProduct from '../../../hook/useProduct';
import { useEffectOnce } from '../../../hook/useEffectOnce';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    ColumnResizedEvent,
    GridReadyEvent,
} from 'ag-grid-community';
import Search from './Search';


function ProductsTable() {


    const gridRef = useRef<AgGridReact<any>>(null);
    const gridStyle = useMemo(() => ({ height: 600, width: '100%' }), []);
    const [productsData, setProductsData] = useState<any[]>([]);
    const [rowData, setRowData] = useState<any[]>([]);

    const { getProducts } = useProduct();

    const getProductsData = async () => {
        const res = await getProducts();
        setRowData(res);
        setProductsData(res)
        // setTimeout(() => {
        //     autoSizeAll(false)
        // }, 100)
    };

    useEffectOnce(() => {
        getProductsData();
    });

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            resizable: true,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        getProductsData()
    }, []);

    const onColumnResized = useCallback((params: ColumnResizedEvent) => {
        console.log(params);
    }, []);

    const autoSizeAll = useCallback((skipHeader: boolean) => {
        const allColumnIds: string[] = [];
        gridRef.current!.columnApi.getColumns()!.forEach((column) => {
            allColumnIds.push(column.getId());
        });
        gridRef.current!.columnApi.autoSizeColumns(allColumnIds, skipHeader);
    }, []);

    // agNumberColumnFilter
    const columnDefs: any = [
        { field: 'name', initialWidth: 200, initialPinned: 'left' },
        {
            headerName: 'INFO',
            children: [
                { headerName: "Company", field: 'company' },
                { headerName: 'Class', field: 'class' },
                { headerName: 'Year released', field: 'releasedYear', width: 135 },
                { headerName: 'Discount Code', field: 'discountCode' },
                {
                    headerName: 'Product Link', field: 'productLink', cellRenderer: (params: any) => {
                        if (params.value) {
                            return (
                                <a href={`${params.value}`} target={"_blank"} rel="noreferrer" className='text-blue-400'>HERE</a>
                            );
                        }
                    }
                },
                {
                    headerName: 'Youtube Review', field: 'youtubeReview', cellRenderer: (params: any) => {
                        if (params.value) {
                            return (
                                <a href={`${params.value}`} target={"_blank"} rel="noreferrer" className='text-blue-400'>HERE</a>
                            );
                        }
                    }
                },
            ],
        },
        {
            headerName: 'COST',
            children: [
                { headerName: "Discounted Price", field: 'discountedPrice' },
                { headerName: 'Shipping USA', field: 'shippingUSA' },
                { headerName: 'Shipping Australia', field: 'shippingAustralia' },
                { headerName: 'Shipping UK', field: 'shippingUK' },
            ],
        },
        {
            headerName: 'SIZE',
            children: [
                { headerName: "Height (inch)", field: 'height' },
                { headerName: 'Width (inch)', field: 'width' },
                { headerName: 'Weight (lb)', field: 'weight' },
                { headerName: 'Cable Length (ft)', field: 'cable' },
            ],
        },
        {
            headerName: 'FEATURES',
            children: [
                { headerName: "Pulsing", field: 'pulsing' },
                { headerName: 'Modular Support', field: 'modularSupport' },
                { headerName: 'Stands', field: 'stands' },
                { headerName: 'Inbuilt Timer', field: 'inbuiltTimer' },
            ],
        },
        {
            headerName: 'WARRANTY',
            children: [
                { headerName: "Warranty", field: 'warranty' },
                { headerName: 'Returns Policy', field: 'returnsPolicy' },
            ],
        },
        {
            headerName: 'LEDS',
            children: [
                { headerName: "LEDS", field: 'leds' },
                { headerName: "LED Dual chip", field: 'ledDualChip' },
                { headerName: "LED chip power", field: 'ledChipPower' },
                { headerName: "480", field: 'led480' },
            ],
        },
        {
            headerName: 'WAVELENGTHS',
            children: [
                { headerName: "610", field: 'wavelengths610', width: 90 },
                { headerName: "630", field: 'wavelengths630', width: 90 },
                { headerName: "660", field: 'wavelengths660', width: 90 },
                { headerName: "810", field: 'wavelengths810', width: 90 },
                { headerName: "830", field: 'wavelengths830', width: 90 },
                { headerName: "850", field: 'wavelengths850', width: 90 },
                { headerName: "930", field: 'wavelengths930', width: 90 },
                { headerName: "950", field: 'wavelengths950', width: 90 },
                { headerName: `Peak Wavelengths Tested < br /> (rounded to nearest 5nm)`, field: 'testedPeakWavelengths' },
            ],
        },
        {
            headerName: 'POWER',
            children: [
                { headerName: "Total Power Output (estimated) mW - (9 pts, av x LED area)", field: 'totalPowerOutput' },
                { headerName: "Av combined power 9 spots (watts)", field: 'power9spots' },
                { headerName: "Peak Power - Combined 6in/centre (mw/cm2)", field: 'power9spots' },
                { headerName: "8Wattage Draw 0", field: 'wattageDraw' },
            ],
        },
        {
            headerName: 'VALUE',
            children: [
                { headerName: "Discounted $ per LED", field: 'discountedPerLed' },
                { headerName: "Discounted $ per total watt output", field: 'discountedPerWatt' },
            ],
        },
        {
            headerName: 'nnEMF',
            children: [
                { headerName: "EMF - Electric 3 inch", field: 'EMFElectric3' },
                { headerName: "EMF - Electric 6 inch", field: 'EMFElectric6' },
                { headerName: "Magnetic - 3 inch (uT)", field: 'magnetic3' },
                { headerName: "Magnetic - 6 inch (uT)", field: 'magnetic6' },
                { headerName: "Micowave - 3inch", field: 'micowave3' },
                { headerName: "Micowave - 6inch", field: 'micowave6' },
            ],
        },
        {
            headerName: 'Flicker & Sound',
            children: [
                { headerName: "Flicker (% & hz) Lower is better", field: 'flicker' },
                { headerName: "Sound Levels", field: 'sound' },
            ],
        },
        { headerName: "Certificates/FDA", field: "certificates" },
        { headerName: "Data Valid as", field: "dataValid" }
    ]

    return (
        <>
            <div className='flex justify-between items-start gap-10'>
                <div style={gridStyle} className="ag-theme-alpine mt-5">
                    <AgGridReact<any>
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                        onColumnResized={onColumnResized}
                    ></AgGridReact>
                </div>
                <Search rowData={rowData} productsData={productsData} setRowData={setRowData} />
            </div>
        </>

    );
}

export default ProductsTable;