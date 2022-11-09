import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock'


describe('PokemonPage component', () => {

    let wrapper
    // let mixPokemonArraySpy

    beforeEach(() => {
        // mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray') //espiar el metodo mixPokemonArray //opcion 2
        //hay que hacer la limpieza para que no interfiera con otro test si tiene el mismo espia

        wrapper = shallowMount(PokemonPage)
    })


    test('Debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot() //esta prueba no ayuda mucho pero es ilustrativa
    });

    test('Debe de llamar mixPokemonArray al montar', () => {
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray') //espiar el metodo mixPokemonArray  //opcion 1 desde solo este test
        const wrapper = shallowMount(PokemonPage)

        expect(mixPokemonArraySpy).toHaveBeenCalled()
    });

    test('Debe de hacer match con el snapshot cuando carga los pokemons', () => {
        const wrapper = shallowMount(PokemonPage, { // shallowMount genera stub y es como una simulacion del renderizado. No genera el ciclo de vida de componentes hijos
            // const wrapper = mount(PokemonPage, { // mount NO genera stub y GENERA TAL CUAL EL RENDEREIZADO

            data() {
                return {
                    pokemonArr: [pokemons],
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    });

    test('Debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
        const wrapper = shallowMount(PokemonPage, {

            data() {
                return {
                    pokemonArr: [pokemons],
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')

        expect(picture.exists()).toBeTruthy()
        expect(options.exists()).toBeTruthy()

        //Nota: Hay que revisar el archivo .snap para ver como quedaron los atributos, en este caso cambió todo a minusculas
        expect(picture.attributes('pokemonid')).toBe('5')
        expect(options.attributes('pokemons')).toBeTruthy() //que el atributo exista

    });


    //otro test con newgame, usar spy para asegurar que haya sido llamado y etc

    test('Pruebas con checkAnswer', async () => {

        const wrapper = shallowMount(PokemonPage, {

            data() {
                return {
                    pokemonArr: [pokemons],
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(5) //Esto ejecuta ese metodo //hay un re-renderizado
        // console.log(wrapper.vm);

        expect(wrapper.find('h2').exists()).toBeTruthy()
        // console.log(wrapper.find('h2').text()); //mostrar el nombre del pokemon

        expect(wrapper.vm.showPokemon).toBe(true)
        expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`)

        await wrapper.vm.checkAnswer(69)
        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`)


    });


});