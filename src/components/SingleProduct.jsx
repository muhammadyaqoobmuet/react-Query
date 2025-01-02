import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function SingleProduct() {
    const params = useParams();

    const fetchProduct = async () => {
        const resp = await fetch(`https://dummyjson.com/products/${params.id}`);
        const data = await resp.json();
        return data;
    };

    const { isLoading, error, data: product } = useQuery({
        queryKey: ['product', params.id],
        queryFn: fetchProduct,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-semibold animate-pulse">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-semibold text-red-500">Error loading product</h1>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg relative">
            <Link to='/products' className='absolute left-0 text-4xl  top-0 px-4 py-2'> 🔙</Link>
            <div className="flex flex-col lg:flex-row">
                {/* Product Image */}
                <div className="flex-shrink-0 lg:w-1/2">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-80 object-cover rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="mt-6 lg:mt-0 lg:ml-8 lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <div className="text-gray-900 font-semibold mb-4">
                        <span className="text-3xl text-green-600">${product.price}</span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                            ${(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}
                        </span>
                    </div>

                    {/* Rating and Stock */}
                    <div className="flex items-center mb-4">
                        <div className="text-yellow-400 text-xl mr-2">{'★'.repeat(Math.round(product.rating))}</div>
                        <span className="text-gray-600 text-sm">{product.rating} / 5</span>
                    </div>
                    <p
                        className={`mb-4 font-medium ${product.stock > 10 ? 'text-green-500' : 'text-red-500'
                            }`}
                    >
                        {product.availabilityStatus}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {product.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Additional Information */}
                    <p className="text-gray-600 text-sm mb-4">
                        <span className="font-medium">Brand:</span> {product.brand}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                        <span className="font-medium">SKU:</span> {product.sku}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                        <span className="font-medium">Weight:</span> {product.weight}g
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                        <span className="font-medium">Dimensions:</span> {product.dimensions.width} x{' '}
                        {product.dimensions.height} x {product.dimensions.depth} mm
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                        <span className="font-medium">Warranty:</span> {product.warrantyInformation}
                    </p>

                    {/* Reviews */}
                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                        {product.reviews.map((review, idx) => (
                            <div
                                key={idx}
                                className="p-4 mb-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
                            >
                                <p className="font-medium text-gray-900">{review.reviewerName}</p>
                                <p className="text-sm text-gray-600">{review.comment}</p>
                                <div className="text-yellow-400 text-sm mt-1">{'★'.repeat(review.rating)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
