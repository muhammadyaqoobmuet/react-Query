import React from 'react';
import ProductList from '../components/ProductList';
import { useQuery } from '@tanstack/react-query';

// This is the function that fetches the products data.
const fetchProducts = async () => {
    const resp = await fetch('https://dummyjson.com/products');
    const data = await resp.json();
    return data.products; // Returning the products array
};

function Product() {
    // Using useQuery hook to fetch the data
    const { isLoading, error, data: products } = useQuery({
        queryKey: ['products'], // Unique key for this query
        queryFn: fetchProducts, // The function to fetch data
      //  staleTime:30000 // time in ms which react qur consider data fresh and doesnot require refresh by default it is consider inf
    });

    // Handling loading state
    if (isLoading) {
        return (
            <h1
                className="absolute text-4xl text-center"
                style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                Loading....
            </h1>
        );
    }

    // Handling error state
    if (error) {
        return <h1>{`Error: ${error.message}`}</h1>;
    }

    // Returning the ProductList component with fetched products
    return <ProductList products={products} />;
}

export default Product;
