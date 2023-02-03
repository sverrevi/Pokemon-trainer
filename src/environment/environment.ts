
export const environment = {
    production: false,
    apiTrainers: "https://fair-organized-spring.glitch.me/trainers",
    apiPokemons: "https://pokeapi.co/api/v2/pokemon?limit=900&offset=0", //This is not ideal to fetch 900 pokemons in one go, but here we are. 
    apiPokemonSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/", //Behind this / it needs to have a pokemon nr and png eks: 1.png
    apiKey: "appAPI123"
}

//,

//"https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"