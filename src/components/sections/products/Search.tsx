import React, { useEffect, useMemo, useState } from 'react';
import BoolSelectFilter from './search/BoolSelectFilter';
import RangeSelector from './search/RangeSelector';
import SelectOneFilter from './search/SelectOneFilter';


function Search({ setRowData, productsData }: any) {
    const [search, setSearch] = useState("");
    const [company, setCompany] = useState<any>();
    const [className, setClassName] = useState<any>();
    const [warranty, setWarranty] = useState<any>();

    const [discountedPrice, setDiscountedPrice] = React.useState<number[]>([0, 100]);
    const [discountedPriceRange, setDiscountedPriceRange] = React.useState<number[]>([0, 0]);

    const [weight, setWeight] = React.useState<number[]>([0, 100]);
    const [weightRange, setWeightRange] = React.useState<number[]>([0, 0]);

    const [height, setHeight] = React.useState<number[]>([0, 100]);
    const [heightRange, setHeightRange] = React.useState<number[]>([0, 0]);

    const [leds, setLeds] = React.useState<number[]>([0, 100]);
    const [ledsRange, setLedsRange] = React.useState<number[]>([0, 0]);

    const [totalPowerOutput, setTotalPowerOutput] = React.useState<number[]>([0, 100]);
    const [totalPowerOutputRange, setTotalPowerOutputRange] = React.useState<number[]>([0, 0]);

    const [isPulsing, setIsPulsing] = useState("0");

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

    const warrantyFiltered = useMemo(() => {
        if (warranty && warranty !== "0") {
            const res = classFiltered.filter((item: any) => (item.warranty && item.warranty.toString().toLowerCase().includes(warranty.toLowerCase())));
            return res;
        }
        return classFiltered
    }, [classFiltered, warranty])

    const discountedPriceFiltered = useMemo(() => {
        const res = warrantyFiltered.filter((item: any) => (item.discountedPrice && item.discountedPrice >= discountedPrice[0] && item.discountedPrice <= discountedPrice[1]));
        return res;
    }, [discountedPrice, warrantyFiltered])

    const weightFiltered = useMemo(() => {
        const res = discountedPriceFiltered.filter((item: any) => (item.weight && item.weight >= weight[0] && item.weight <= weight[1]));
        return res;
    }, [weight, discountedPriceFiltered])

    const heightFiltered = useMemo(() => {
        const res = weightFiltered.filter((item: any) => (item.height && parseFloat(item.height) >= height[0] && parseFloat(item.height) <= height[1]));
        return res;
    }, [height, weightFiltered])

    const ledsFiltered = useMemo(() => {
        const res = heightFiltered.filter((item: any) => (item.leds && parseFloat(item.leds) >= leds[0] && parseFloat(item.leds) <= leds[1]));
        return res;
    }, [leds, heightFiltered])

    const totalPowerOutputFiltered = useMemo(() => {
        const res = ledsFiltered.filter((item: any) => (item.totalPowerOutput && parseFloat(item.totalPowerOutput) >= totalPowerOutput[0] && parseFloat(item.totalPowerOutput) <= totalPowerOutput[1]));
        return res;
    }, [totalPowerOutput, ledsFiltered])

    const pulsingFiltered = useMemo(() => {
        if (isPulsing && isPulsing !== "0") {
            const res = totalPowerOutputFiltered.filter((item: any) => (
                item.pulsing && isPulsing === "true" ? item.pulsing.toString().toLowerCase().includes("yes") : item.pulsing.toString().toLowerCase().includes("no")
            ));
            return res;
        }
        return totalPowerOutputFiltered
    }, [isPulsing, totalPowerOutputFiltered])

    useEffect(() => {
        setRowData(pulsingFiltered)
    }, [pulsingFiltered, setRowData])

    return (
        <>
            <div className='mt-4 w-[250px] text-sm'>
                <div className='gap-4'>
                    <p className='font-medium'>Search:</p>
                    <input
                        type={'text'}
                        className="border border-blue-500 px-3 py-2 h-10 rounded font-medium outline-none w-full"
                        placeholder='Search'
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                    />
                </div>

                <div className='mt-2'>
                    <SelectOneFilter data={productsData} field={"company"} value={company} setValue={setCompany} label="Company" />
                    <SelectOneFilter data={productsData} field={"class"} value={className} setValue={setClassName} label="Class" />
                    <SelectOneFilter data={productsData} field={"warranty"} value={warranty} setValue={setWarranty} label="Warranty" />
                </div>
                <div>
                    <BoolSelectFilter label={"Pulsing"} value={isPulsing} setValue={setIsPulsing} />
                </div>
                <div className=''>
                    <RangeSelector
                        data={productsData}
                        field={'discountedPrice'}
                        label="Discounted Price"
                        value={discountedPrice}
                        setValue={setDiscountedPrice}
                        valueRange={discountedPriceRange}
                        setValueRange={setDiscountedPriceRange}
                    />
                    <RangeSelector
                        data={productsData}
                        field={'weight'}
                        label="Weight (lb)"
                        value={weight}
                        setValue={setWeight}
                        valueRange={weightRange}
                        setValueRange={setWeightRange}
                    />
                    <RangeSelector
                        data={productsData}
                        field={'height'}
                        label="Height (inch)"
                        value={height}
                        setValue={setHeight}
                        valueRange={heightRange}
                        setValueRange={setHeightRange}
                    />
                </div>
                <div className=''>
                    <RangeSelector
                        data={productsData}
                        field={'leds'}
                        label="LEDS"
                        value={leds}
                        setValue={setLeds}
                        valueRange={ledsRange}
                        setValueRange={setLedsRange}
                    />
                    <RangeSelector
                        data={productsData}
                        field={'totalPowerOutput'}
                        label="Total Power Output"
                        value={totalPowerOutput}
                        setValue={setTotalPowerOutput}
                        valueRange={totalPowerOutputRange}
                        setValueRange={setTotalPowerOutputRange}
                    />
                </div>
            </div>
        </>
    );
}

export default Search;