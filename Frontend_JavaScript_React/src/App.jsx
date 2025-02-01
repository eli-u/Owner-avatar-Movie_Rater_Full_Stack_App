import { useState, useEffect } from 'react'
import './App.css'
import MR_logo from './assets/MR_logo.png'
import MovieList from './components/movie-list'
import MovieDetials from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { GoSignOut } from "react-icons/go";



function App() {

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState(null);
  const [cookie, setCookie, deleteCookie] = useCookies("mr-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie['mr-token']) navigate('/')
  }, [cookie])

  const movieClicked = (movie, isEdit) => {
    if (isEdit) {
      setSelectedMovie(null);
      setEditedMovie(movie);
    } else {
      setSelectedMovie(movie);
      setEditedMovie(null);
    }
  }

  const createNewMovie = () => {
    setSelectedMovie(null);
    setEditedMovie({ title: '', description: '' })
  }

  const logoutUser = () => {
    deleteCookie(['mr-token']);
    navigate('/');
  }


  return (
    <div className='App'>
      <header className='App-header p-10 border-b-2 border-orange-500 mb-5'>
        <img src={MR_logo} className="w-[150px] h-auto" />
        <h1>Movie Rater</h1>
      </header>
      <div className='grid grid-cols-1 gap-2 absolute top-5 right-6 text-s cursor-pointer text-black'>
        <span>Welcome: El</span>
        <span className='cursor-pointer' onClick={() => logoutUser()}><GoSignOut /></span>
      </div>
      <div className='grid grid-cols-2'>
        <div>
          <MovieList movieClicked={movieClicked} newMovie={newMovie} updatedMovie={updatedMovie} />
          <button onClick={() => createNewMovie()} >Create New Movie</button>
        </div>

        <MovieDetials movie={selectedMovie} updateMovie={setSelectedMovie} />
        {editedMovie && <MovieForm movie={editedMovie} addNewMovie={setNewMovie} updateMovie={setUpdatedMovie} />}
      </div>
    </div>
  )
}



export default App
