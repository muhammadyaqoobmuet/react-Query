import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function UploadProduct() {
    // Mutation to handle the POST request
    const mutation = useMutation({
        mutationFn: (newProduct) => {
            return axios.post('https://dummyjson.com/products/add', newProduct);
        },
    });

    const [name, setName] = useState('');

    // Handle changes in the product title input
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Call the mutation function to post the new product
        mutation.mutate({
            title: name,
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
            <Link to="/" className="absolute left-0 text-4xl top-0 px-4 py-2"> 🔙</Link>
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Upload Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Product Title</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter product title"
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Upload
                    </button>
                </form>

                {/* Show loading, error, or success states */}
                {mutation.isPending && <p className="mt-4 text-center text-gray-600">Uploading...</p>}
                {mutation.isError && <p className="mt-4 text-center text-red-500">Error: {mutation.error.message}</p>}
                {mutation.isSuccess && <p className="mt-4 text-center text-green-500">Product uploaded successfully!</p>}
            </div>
        </div>
    );
}

export default UploadProduct;
