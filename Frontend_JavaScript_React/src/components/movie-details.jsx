import React, { useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import API from '../services/api-service';
import { useCookies } from "react-cookie";


export default function MovieDetials({ movie, updateMovie }) {

    const [higlighted, setHighlighted] = useState(-1);
    const [error, setError] = useState(null);
    const [token] = useCookies("mr-token");
    const API_URL = import.meta.env.VITE_API_URL
    const API_TOKEN = import.meta.env.VITE_API_TOKEN

    const rateMovie = async (rate) => {
        const rateMovie = async () => {
            const resp = await API.rateMovie(movie.id, { stars: rate }, token["mr-token"]);
            if (resp) {
                setError("Successfully updated");
                getNewMovie();
            } else {
                setError("Error setting rating")
            }
        }
        rateMovie()
    }

    // const rateMovie = async (rate) => {
    //     try {
    //         const response = await fetch(`${API_URL}/api/movies/${movie.id}./rate_movie/`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Token ${API_TOKEN}`
    //             },
    //             body: JSON.stringify({ stars: rate })
    //         });
    //         if (!response.ok) {
    //             setError("Error setting rating");
    //             return;
    //         }
    //         // const result = await response.json();
    //         setError("Successfully updated");
    //         getNewMovie();
    //     } catch {
    //         setError("Error setting rating")
    //     }
    // }

    const getNewMovie = async () => {
        const fetchMovie = async () => {
            const resp = await API.getMovie(movie.id, token["mr-token"]);
            if (resp) updateMovie(resp);
        }
        fetchMovie()
    }

    return (
        <>
            {movie &&
                <div>
                    <h1 className="text-2xl pb-3">{movie.title}</h1>
                    <p className="text-xl pb-3">{movie.description}</p>
                    <div className="flex pt-2">
                        <FaStar className={movie.avg_rating > 0 && "text-orange-400"} />
                        <FaStar className={movie.avg_rating > 1 && "text-orange-400"} />
                        <FaStar className={movie.avg_rating > 2 && "text-orange-400"} />
                        <FaStar className={movie.avg_rating > 3 && "text-orange-400"} />
                        <FaStar className={movie.avg_rating > 4 && "text-orange-400"} />
                        <p>({movie.no_of_ratings})</p>
                    </div>
                    <h1 className="border-t-2 border-purple-600 mt-5">Rate the movie!</h1>
                    <div className="flex text-3xl">
                        {[...Array(5)].map((el, indx) => {
                            return <FaStar
                                className={higlighted > indx && "text-purple-400"}
                                onMouseEnter={() => setHighlighted(indx + 1)}
                                onMouseLeave={() => setHighlighted(-1)}
                                onClick={() => rateMovie(indx + 1)}

                            />
                        })}
                    </div>
                    {error && <p>{error}</p>}
                </div>
            }
        </>
    );
}