API = 'https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0'

const content = null || document.getElementById('content')

async function fetchData(urlApi) {
	const response = await fetch(urlApi);
	return await response.json();
}

async function getPokemon(urlList) {
	pokemonData = [];
	for(var url of urlList) {
		var response = await fetchData(url);
        pokemonData.push(response);
	}
	return pokemonData;
}

/* It's an IIFE (Immediately Invoked Function Expression) that is async. */
(async () => {
	try {
		const pokemonList = await fetchData(API); 
		const urlList = pokemonList.results.map(pokemon => pokemon.url);
		const pokemonData = await getPokemon(urlList);
		
		console.log(pokemonData);
		let cardPokemon = `
		${pokemonData.map(pokemon => `
		<div class="group relative">
			<div
				class="w-full bg-slate-800 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
				<img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="" class="w-full mt-5">
				<div class="text-center text-white mb-4 font-bold">
					Pokedex Number: ${pokemon.id}
					<br> 
					
					${pokemon.types.map(type => type.type.name[0].toUpperCase() + type.type.name.slice(1)).join(' & ')}
				</div>
			</div>
			<div class="mt-4 flex justify-between">
				<h3 class="text-md mb-2">
					<span aria-hidden="true" class="absolute text-center inset-0 text-sky-700 mt-2 mb-4 font-bold">
						${function(){
							first = pokemon.name.charAt(0).toUpperCase();
							return  first + pokemon.name.slice(1)}()}
					</span>
				</h3>
			</div>
		</div>
			`).join('')}
			`;
		content.innerHTML = cardPokemon;

	}
	catch (error) {
		console.error(error);
		alert(error.message);
	}
})();
