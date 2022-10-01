const container: HTMLElement | any = document.getElementById('app');
const pokemons: number = 100;

interface IPokemons {
    id: number;
    name: string;
    image: string;
    type: string;
}

const fetchData = (): void => {
    for (let i = 1; i <= pokemons; i++) {
        getPokemon(i);
    }
}

const getPokemon = async (id: number): Promise<void> => {
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon: any = await data.json();
    const pokemonType: string = pokemon.types
        .map((poke: any) => poke.type.name)
        .join(", ");

    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType
    }

    showPokemon(transformedPokemon);
}

const showPokemon = (pokemon: IPokemons): void => {
    let output = `
            <div class="w-[12rem_auto] bg-[#333] text-[#e4c439] p-[1rem] rounded-[10px] border-t-[0.5px_solid_#cebf7b] border-b-[0.5px_solid_#cebf7b] text-center
            shadow-[0_3px_6px_rgba(0,0,0,0.16),_0_3px_6px_rgba(0,0,0,0.23)] relative overflow-hidden cursor-pointer ease-in-out hover:scale-105">
                <span class="bg-[#cebf7b] w-[3rem] text-[#333] p-[0.1rem] font-bold absolute rounded-[0_0_10px_0] top-0 left-0">#${pokemon.id}</span>
                <img class="w-36 block m-auto" src="${pokemon.image}" alt=${pokemon.name}>
                <h1 class="capitalize text-[#fff] text-2xl font-bold">${pokemon.name}</h1>
                <span class="text-[1.3rem] text-[#dbca80]">${pokemon.type}</span>
            </div>
    `;

    // container.innerHTML = output;
    container.innerHTML += output;
}

fetchData();