import React, { useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { Stack } from '@mui/material';
import { getMaxMinQuote } from '../../../../utils';

function RangeSelector({ data, field, label, value, setValue, valueRange, setValueRange }: any) {

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    useEffect(() => {
        const da = getMaxMinQuote(data, field);
        setValueRange([da.min, da.max])
        setValue([da.min, da.max])
    }, [data, field, setValue, setValueRange])

    return (
        <>
            <p className='font-medium'>{label}:</p>
            <div className='ml-4'>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <p className='w-10 text-right'>{value[0]}</p>
                    <div className='w-[160px] pt-2'>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            min={valueRange[0]}
                            max={valueRange[1]}
                        />
                    </div>
                    <p className='w-12'>{value[1]}</p>
                </Stack>
            </div>
        </>
    );
}

export default RangeSelector;