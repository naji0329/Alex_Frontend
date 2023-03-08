import React, { useEffect, useMemo, useState } from 'react';
import { getMaxMinQuote, getUniquelistFromArrayByKey } from '../../../utils';
import Slider from '@mui/material/Slider';
import { Stack } from '@mui/material';


function Search({ setRowData, productsData }: any) {

    const [search, setSearch] = useState("");
    const [company, setCompany] = useState<any>();
    const [className, setClassName] = useState<any>();
    const [discountedPrice, setDiscountedPrice] = React.useState<number[]>([0, 100]);
    const [discountedPriceRange, setDiscountedPriceRange] = React.useState<number[]>([0, 0]);

    function valuetext(value: number) {
        return `${value}°C`;
    }

    const searched = useMemo(() => {
        var _filtered: any = []
        if (search) {
            for (let i = 0; i < productsData.length; i++) {
                for (const key in productsData[i]) {
                    if (productsData[i][key].toString().toLowerCase().includes(search.toLowerCase())) {
                        _filtered.push(productsData[i]);
                        break;
                    }
                }
            }
        } else {
            _filtered = productsData;
        }
        return _filtered;
    }, [productsData, search])

    const companyfiltered = useMemo(() => {
        if (company && company !== "0") {
            const res = searched.filter((item: any) => (item.company && item.company.toString().toLowerCase().includes(company.toLowerCase())));
            return res;
        }
        return searched
    }, [searched, company])

    const classFiltered = useMemo(() => {
        if (className && className !== "0") {
            const res = companyfiltered.filter((item: any) => (item.class && item.class.toString().toLowerCase().includes(className.toLowerCase())));
            return res;
        }
        return companyfiltered
    }, [companyfiltered, className])

    const discountedPriceFiltered = useMemo(() => {
        const res = classFiltered.filter((item: any) => (item.discountedPrice && item.discountedPrice >= discountedPrice[0] && item.discountedPrice <= discountedPrice[1]));
        console.log("__________", res);
        return res;
    }, [discountedPrice, classFiltered])

    useEffect(() => {
        setRowData(discountedPriceFiltered)
    }, [discountedPriceFiltered, setRowData])

    const handleDiscountedPriceChange = (event: Event, newValue: number | number[]) => {
        setDiscountedPrice(newValue as number[]);
    };

    useEffect(() => {
        const da = getMaxMinQuote(productsData, 'discountedPrice');
        console.log('________________', da)
        setDiscountedPriceRange([da.min, da.max])
        setDiscountedPrice([da.min, da.max])
    }, [productsData])

    return (
        <div className='flex justify-start gap-4 items-center'>
            <div>
                <p className='font-medium'>Search:</p>
                <input
                    type={'text'}
                    className="border border-blue-500 px-3 py-2 h-10 rounded outline-none"
                    placeholder='Search'
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                />
            </div>
            <div>
                <p className='font-medium'>Company:</p>
                <select
                    className="border border-blue-500 px-3 py-2 h-10 rounded outline-none"
                    value={company}
                    onChange={(e) => { setCompany(e.target.value) }}
                >
                    <option value="0">---</option>
                    {
                        getUniquelistFromArrayByKey(productsData, "company")?.map((row: any, key: number) => {
                            return <option key={key}>{row}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <p className='font-medium'>Class:</p>
                <select
                    className="border border-blue-500 px-3 py-2 h-10 rounded outline-none"
                    value={className}
                    onChange={(e) => { setClassName(e.target.value) }}
                >
                    <option value="0">---</option>
                    {
                        getUniquelistFromArrayByKey(productsData, "class")?.map((row: any, key: number) => {
                            return <option key={key}>{row}</option>
                        })
                    }
                </select>
            </div>
            <div className="w-48">
                <p className='font-medium'>Discounted Price:</p>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <p>{discountedPriceRange[0]}</p>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={discountedPrice}
                        onChange={handleDiscountedPriceChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={discountedPriceRange[0]}
                        max={discountedPriceRange[1]}
                    />
                    <p>{discountedPriceRange[1]}</p>
                </Stack>
            </div>
        </div>
    );
}

export default Search;