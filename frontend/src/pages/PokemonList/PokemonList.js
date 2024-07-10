import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '../../components/Button/button';
import './PokemonList.css'
import Loader from '../../components/Loader/Loader'
import { Link } from 'react-router-dom'

function PokemonList()  {
    const limit = 20;
    const [pokemon, setPokemon] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // The function to get a list of pokemons
    const fetchPokemons = async () => {
        
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=${limit}`)
        setPokemon(response.data.results)

        setIsLoading(false)
        
    }

    useEffect(() => {
        setIsLoading(true);
        fetchPokemons()
    }, [page]) // everytime the value of my state varialbe page changes, I am gonna call this useEffect function

    const goToPreviousPage = () => {
        if (page === 0) {
            alert('Cannot go to the previous page')
            return
        }
        let newPage = page - 1
        setPage(newPage)
    }

    console.log('show loader', isLoading)

    const goToNextPage = () => {
        let newPage = page + 1
        setPage(newPage)
    }

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const filteredPokemon = pokemon.filter((poke) => poke.name.includes(searchQuery))

    return (
        <div>
            <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
            {
                isLoading ? <Loader /> : 
                
                filteredPokemon.map((poke, index) => {
                        return (
                            <div className="pokemon" key={index}>
                                <Link to={`/pokemon/detail/${poke.name}`}>{poke.name}</Link>
                            </div>
                        )
                    })
                
            }

            <div>
                <Button text={'Previous'} fn={goToPreviousPage} />
                {page}
                <Button text={'Next'} fn={goToNextPage} />
            </div>
        </div>
    )
}

export default PokemonList