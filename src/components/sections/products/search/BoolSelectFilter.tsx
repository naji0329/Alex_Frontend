import React from 'react';

function BoolSelectFilter({ value, setValue, label }: any) {
    return (
        <div className='mb-3 flex justify-between items-center'>
            <p className='font-medium'>{label}:</p>
            <select
                className="border border-blue-500 px-3 py-2 w-20 rounded outline-none w-full"
                value={value}
                onChange={(e) => { setValue(e.target.value) }}
            >
                <option value="0">---</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>
    );
}

export default BoolSelectFilter;