import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({ products }) {
    return (
        <div className="my-2">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-[#3333]">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                    Customers also purchased
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <img
                                alt={product.title}
                                src={product.thumbnail}
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-white">
                                        <Link to={`/products/product/${product.id}`}>
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            {product.title}
                                        </Link>
                                    </h3>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    ${product.price}
                                </p>
                            </div>
                            <p className="mt-2 text-sm bg-black text-white px-2 py-1 text-center rounded-lg hover:bg-gray-50 hover:text-black cursor-pointer">
                                {product.category}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductList;
