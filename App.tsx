/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '27ab2c9fc8mshd4d0a754da0ee5dp1b31ebjsn9b823acef188',
    'X-RapidAPI-Host': 'cheapshark-game-deals.p.rapidapi.com',
  },
};

function fetchStoreFromId(storeID: string) {
  const url = 'https://cheapshark-game-deals.p.rapidapi.com/stores';

  try {
    fetch(url, options)
      .then(response => response.json())
      .then(json => {
        json.forEach(store => {
          if (store.storeID === storeID) {
            console.log(store.storeName);
            // return store.storeName;
          }
        });
      });
  } catch (error) {
    console.error(error);
  }
}

function getCheapestGame(gameName: string) {
  const url = `https://cheapshark-game-deals.p.rapidapi.com/deals?steamRating=0&title=${gameName}&desc=0&output=json&steamworks=0&sortBy=Price&AAA=0&pageSize=60&exact=true&upperPrice=50&pageNumber=0&metacritic=0`;

  try {
    fetch(url, options)
      .then(response => response.json())
      .then(json => {
        console.log(json[0].internalName);
        console.log(json[0].title);
        console.log(json[0].salePrice);
        fetchStoreFromId(json[0].storeID);
      });
  } catch (error) {
    console.error(error);
  }
}

function App(): JSX.Element {
  // getCheapestGame('eldenring');
  // getCheapestGame('arksurvivalevolved');
  // getCheapestGame('nomanssky');
  getCheapestGame('arksurvivalevolved');

  return (
    <SafeAreaView>
      <Text>Pokemon name</Text>
      <TextInput placeholder="Test" />
      <TouchableOpacity>
        <Text>SUBMIT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
