import React from 'react';
import { getUniquelistFromArrayByKey } from '../../../../utils';

function SelectOneFilter({ data, field, value, setValue, label }: any) {
    return (
        <div className='mb-3'>
            <p className='font-medium'>{label}:</p>
            <select
                className="border border-blue-500 px-3 py-2 rounded outline-none w-full"
                value={value}
                onChange={(e) => { setValue(e.target.value) }}
            >
                <option value="0">---</option>
                {
                    getUniquelistFromArrayByKey(data, field)?.map((row: any, key: number) => {
                        return <option key={key}>{row}</option>
                    })
                }
            </select>
        </div>
    );
}

export default SelectOneFilter;