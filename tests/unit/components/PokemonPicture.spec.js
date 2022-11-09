import { shallowMount } from "@vue/test-utils";
import PokemonPicture from '@/components/PokemonPicture'

describe('PokemonPicture component', () => {

    //verificar que el codigo no cambie
    test('Debe hacer match con el snapshot', () => {

        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: false
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    });

    test('Debe mostrar imagen oculta y el pokemon numero 100', () => {

        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: false
            }
        })

        const [img1, img2] = wrapper.findAll('img')

        expect(img1.exists()).toBeTruthy()
        expect(img2).toBe(undefined)

        // console.log(img1.classes()); //muestra las clases de estilos del elemento
        expect(img1.classes('hidden-pokemon')).toBe(true)
        expect(img1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
    });

    test('Debe mostrar la imagen delo pokemon si showPokemon: true', () => {

        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: true
            }
        })

        // console.log(wrapper.html());// muestra lo que se está renderizando hasta este punto

        const img1 = wrapper.find('img') //solo se necesita una imagen por la otra desaparece en el renderizado

        expect(img1.exists()).toBeTruthy()

        expect(img1.classes('hidden-pokemon')).toBe(false)
        expect(img1.classes('fade-in')).toBe(true)
    });
});