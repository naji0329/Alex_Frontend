import React from 'react';
import ProductsTable from '../../components/sections/products/ProductsTable';

function Products() {
    return (
        <div className='n-container py-10'>
            <p className='text-4xl text-blue-500 font-medium'>Products</p>
            <div className='mt-4'>
                <ProductsTable />
            </div>
        </div>
    );
}

export default Products;