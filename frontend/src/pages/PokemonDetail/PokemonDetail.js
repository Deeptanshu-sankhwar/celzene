import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetail.css';
import Loader from '../../components/Loader/Loader'

function PokemonDetail() {

    const { name } = useParams(); //ivysaur
    const [pokemon, setPokemon] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const fetchPokemonDetails = async () => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        setPokemon(response.data)
        setIsLoading(false)
    }

    // to fetch the details of this pokemon name during the page load ie, Stage 2 of my react component lifecycle (empty dependancies on my useEffect)
    useEffect(() => {
        setIsLoading(true)
        fetchPokemonDetails();
    }, [])

    return (
        <div>
            {
                isLoading ? <Loader />
                :
                <>
                <h2>{pokemon?.name}</h2>
                    <img src={pokemon?.sprites.back_default} />
                    <div>Weight: {pokemon?.weight}</div>

                    {
                        pokemon?.stats.map((stat, index) => {
                            return (
                                <>
                                    <div>Effort: {stat.effort}</div>
                                    <div>Base Stat: {stat.base_stat}</div>
                                </>
                            )
                        })
                    }
                </>
            }
        </div>
    )
}

export default PokemonDetail;