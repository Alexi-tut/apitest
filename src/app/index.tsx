import { useAudioPlayer } from 'expo-audio';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";


export default function Index() {
const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
      .then(res => res.json())
      .then(data => setPokemon(data.results));
  }, []);
  const player = useAudioPlayer();

  function playCry(id:number) {
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
    
    // 1. Reemplazamos la fuente del audio por la URL de internet
    player.replace(cryUrl);
    // 2. Lo reproducimos de inmediato
    player.play();
  }
 
  return (
    <View style={{ paddingTop: 50, flex: 1 }}>
      <FlatList
        data={pokemon}
        renderItem={({ item, index }) => {
          const id:number = index + 1; // El ID corresponde a la posición + 1
          const imageUrl:string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Image source={{ uri: imageUrl }} style={{ width: 50, height: 50 }} />
              <Text style={{ marginLeft: 10, fontSize: 18 }}>{item.name}</Text>
              <Button title="Cantar" onPress={() => playCry(id)} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});


