import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPokemon = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

  const handleSearch = () => {
    const id = parseInt(searchTerm);
    if (!isNaN(id)) {
      fetchPokemon(id);
    }
  };

  useEffect(() => {
    fetchPokemon(1); // Fetch Bulbasaur by default
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokeFinder</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon ID"
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <Button title="Search" onPress={handleSearch} />

      {pokemon && (
        <View style={styles.pokemonInfo}>
          <Image
            style={styles.image}
            source={{ uri: pokemon.sprites.front_default }}
          />
          <Text style={styles.name}>Name: {pokemon.name}</Text>
          <Text style={styles.id}>ID: {pokemon.id}</Text>
          <Text style={styles.type}>Type: {pokemon.types.map(type => type.type.name).join(', ')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  pokemonInfo: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 16,
  },
  type: {
    fontSize: 16,
  },
});

export default App;
