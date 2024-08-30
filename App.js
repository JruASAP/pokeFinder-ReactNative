import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native';
import Sound from 'react-native-sound';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const soundRef = useRef(null);

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
    fetchPokemon(1); 
  }, []);

  useEffect(() => {
    if (pokemon && pokemon.name) { 
      soundRef.current = new Sound(
        `https://pokemoncries.com/cries/${pokemon.name.toLowerCase()}.mp3`,
        Sound.MAIN_BUNDLE,
        (error) => {
          if (error) {
            console.error('Failed to load the sound:', error);
          }
        }
      );

      return () => {
        if (soundRef.current) {
          soundRef.current.release();
        }
      };
    }
  }, [pokemon.name]); 

  const playCry = () => {
    if (soundRef.current) {
      soundRef.current.play((success) => {
        if (!success) {
          console.error('Sound playback failed');
        }
      });
    }
  };

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
          <Button title="Play Cry" onPress={playCry} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc', 
    padding: 10,
    marginBottom: 10,
    width: '80%',
    backgroundColor: '#333333', 
    color: '#ffffff', 
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
    color: '#ffffff', 
  },
  id: {
    fontSize: 16,
    color: '#e0e0e0', 
  },
  type: {
    fontSize: 16,
    color: '#e0e0e0', 
  },
});

export default App;
