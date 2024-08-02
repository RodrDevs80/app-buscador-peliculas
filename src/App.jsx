import { useState } from "react";
import "./App.css";
import sinImagen from './assets/img/sinImagen.svg'

const disculpa= "Lamentamos mucho no contar con la reseña de la película que busca. Estamos trabajando constantemente para ampliar nuestra base de datos, pero aún no hemos podido incluir esta en particular. Le sugerimos consultar otras fuentes especializadas o plataformas de streaming para obtener más información."



function App() {
const urlBase='https://api.themoviedb.org/3/search/movie';
const KEYAPI='d9ecc4467f178d6530cfe9b310000d4a';

const [peliculaBuscada, setPeliculaBuscada] = useState('');
const [datosPeliculas,SetDatosPeliculas]= useState(null);
const onPelicula =(e)=>{
  setPeliculaBuscada(e.target.value);
}
const fechtPeliculas= async()=>{
try {
  const response = await fetch(`${urlBase}?query=${peliculaBuscada}&api_key=${KEYAPI}`);
  const data= await response.json();
  SetDatosPeliculas(data);

} catch (error) {
  console.log(`Se produjo un error: ${error} 🚨`);
}

 
}
const onSubmitPelicula=(e)=>{
   e.preventDefault();
   fechtPeliculas();
}

  return (
    <>
      <div className="container">
        <h1>Buscador de Películas</h1>
        <form onSubmit={onSubmitPelicula}>
          <input
            type="text"
            name="pelicula"
            value={peliculaBuscada}
            onChange={onPelicula}
          />
          <button type="submit">Buscar</button>
        </form>
        <div className="movie-list">
          {datosPeliculas && datosPeliculas.results.map((pelicula)=>(
           <div key={pelicula.id} className="movie-card">
               {pelicula.poster_path!==null?<img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />:
                <div>
                <h2>Sin imagen Disponible!!!😔</h2>
                <img src={sinImagen} alt={pelicula.title} />
                </div>
               }  
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview!==''? pelicula.overview:disculpa}</p>
            </div>  
        ))}
        </div>
      </div>
    </>
  );
}

export default App;
