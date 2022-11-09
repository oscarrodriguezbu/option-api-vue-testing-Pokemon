import pokemonApi from "@/api/pokemonApi";

describe('pokemonApi', () => {

    test('Axios debe estar configurado con el api de pokemon', () => {
        // console.log(pokemonApi);
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')


    });
});                