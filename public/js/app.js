"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const container = document.getElementById('app');
const pokemons = 100;
const fetchData = () => {
    for (let i = 1; i <= pokemons; i++) {
        getPokemon(i);
    }
};
const getPokemon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = yield data.json();
    const pokemonType = pokemon.types
        .map((poke) => poke.type.name)
        .join(", ");
    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType
    };
    showPokemon(transformedPokemon);
});
const showPokemon = (pokemon) => {
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
};
fetchData();
