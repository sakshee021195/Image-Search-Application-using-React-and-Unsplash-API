import React, { useState } from 'react';
import axios from "axios";

const Img = () => {
    const [photos, setPhotos] = useState("");  // Search input
    const [result, setResult] = useState([]);  // Search results
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState("");  // Error state
    const [page, setPage] = useState(1);  // Page state for pagination

    const searchImage = (pageNumber = 1) => {
        setLoading(true);  // Start loading
        setError("");  // Reset error

        axios.get(`https://api.unsplash.com/search/photos?page=${pageNumber}&query=${photos}&client_id=N3NsSOJJ7CKomIwM1BS5FFvJTGAv68yGLltmf-qx6e8`)
        .then((response) => {
            console.log(response.data);
            setResult(response.data.results);
            setLoading(false);  // Stop loading
        })
        .catch((err) => {
            setError("Failed to fetch images. Please try again.");  // Set error message
            setLoading(false);  // Stop loading
        });
    };

    const img1 = {
        width: "250px",
        height: "250px",
        margin: "10px",
        padding: "10px",
    };

    // Function for next page in pagination
    const nextPage = () => {
        setPage(page + 1);
        searchImage(page + 1);
    };

    // Function for previous page in pagination
    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            searchImage(page - 1);
        }
    };

    return (
        <>
            <div className='container'>
                <div className="mb-3 text-center my-5">
                    <label htmlFor="search" className='form-label'>Search Images</label>
                    <input
                        type="text"
                        className="form-control"
                        id="search"
                        placeholder="Search Images"
                        value={photos}
                        onChange={(e) => setPhotos(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => searchImage(1)}  // Reset to page 1 when searching
                        className="btn btn-primary my-2"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className='container text-center my-5'>
                {error && <p className="text-danger">{error}</p>}  {/* Display error if any */}
                {loading ? (
                    <p>Loading...</p> 
                ) : (
                    <div className='row'>
                        {result.length > 0 ? (
                            result.map((actualData) => (
                                <div className='col-md-3' key={actualData.id}>
                                    <img
                                        style={img1}
                                        src={actualData.urls.regular}
                                        alt={actualData.alt_description || "images"}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No images found</p>  
                        )}
                    </div>
                )}

                {/* Pagination Controls */}
                {!loading && result.length > 0 && (
                    <div className="pagination-controls mt-4">
                        <button onClick={prevPage} className="btn btn-secondary mx-2" disabled={page === 1}>Previous</button>
                        <button onClick={nextPage} className="btn btn-secondary mx-2">Next</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Img;
