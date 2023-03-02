import React from 'react';
import ProductsTable from '../../components/sections/products/ProductsTable';

function Products() {
    return (
        <div className='n-container py-20'>
            <p className='text-3xl'>Products</p>
            <div className='mt-4'>
                <ProductsTable />
            </div>
        </div>
    );
}

export default Products;