import { useState, useEffect } from "react"
import API from "../services/api-service";
import { useCookies } from "react-cookie";

export default function MovieForm({ movie, updateMovie, addNewMovie }) {

    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);
    const [token] = useCookies("mr-token");

    useEffect(() => {
        setTitle(movie.title);
        setDescription(movie.description);
    }, [movie])

    const saveMovie = async () => {
        const resp = await API.updateMovie(movie.id, { title, description }, token["mr-token"])
        if (resp) updateMovie(resp);
    };

    const createMovie = async () => {
        const resp = await API.createMovie({ title, description }, token["mr-token"])
        if (resp) addNewMovie(resp);
    };

    const isDisabled = title == '' || description == '';

    return (
        <>
            {movie &&
                <div className="grid grid-cols-2 gap-2 bg-black-200 text-white-500">

                    <label htmlFor="title">Title</label>
                    <input className="bg-white text-black" id="title" type="text" placeholder="Title" value={title}
                        onChange={(evt) => setTitle(evt.target.value)} />

                    <label htmlFor="description">Description</label>
                    <textarea className="bg-white text-black" id="description" placeholder="Description" value={description}
                        onChange={(evt) => setDescription(evt.target.value)} />

                    <p>&nbsp;</p>
                    {movie.id ?
                        <button onClick={() => saveMovie()} disabled={isDisabled}>Update Movie</button> :
                        <button onClick={() => createMovie()} disabled={isDisabled}>Create Movie</button>
                    }
                </div>}
        </>
    )
}