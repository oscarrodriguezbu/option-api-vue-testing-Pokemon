import { shallowMount } from "@vue/test-utils";
import PokemonOptions from '@/components/PokemonOptions'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonOptions component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons: pokemons
            }
        })
    })



    test('Debe hacer match con el snapshot', () => {
        // console.log(wrapper.html());
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('Debe mostrar las 4 opciones correctamente', () => {
        const liTags = wrapper.findAll('li')

        expect(liTags.length).toBe(4)

        expect(liTags[0].text()).toBe('pikachu')
        expect(liTags[1].text()).toBe('charmander')
        expect(liTags[2].text()).toBe('venusaur')
        expect(liTags[3].text()).toBe('mew')

    });

    test('Debe emitir "seleccion" con sus respectivos parametros al hacer click', () => {
        const [li1, li2, li3, li4] = wrapper.findAll('li')

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')
        // console.log(wrapper.emitted('selectionPokemon'));

        expect(wrapper.emitted('selectionPokemon').length).toBe(4) //veces emitido
        expect(wrapper.emitted('selectionPokemon')[0]).toEqual([5]) // valor emitido
        expect(wrapper.emitted('selectionPokemon')[1]).toEqual([10]) // valor emitido
        expect(wrapper.emitted('selectionPokemon')[2]).toEqual([15]) // valor emitido
        expect(wrapper.emitted('selectionPokemon')[3]).toEqual([20]) // valor emitido

    });
});