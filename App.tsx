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
  // getCheapestGame('arksurvivalevolved');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchBarTitle}>Game</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="ARK Survival Evolved..."
          placeholderTextColor="#eeeeee"
        />
        <TouchableOpacity style={styles.searchBarBtn}>
          <Text style={styles.searchBarBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    height: '100%',
    paddingTop: 50,
  },
  searchBarContainer: {
    alignItems: 'center',
  },
  searchBar: {
    borderWidth: 0,
    borderColor: '#6413B7',
    backgroundColor: '#8244D6',
    paddingTop: 5,
    paddingRight: 20,
    paddingBottom: 5,
    paddingLeft: 20,
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 10,
    width: '80%',
  },
  searchBarTitle: {
    color: '#ffffff',
    fontSize: 18,
  },
  searchBarBtn: {
    backgroundColor: '#6413B7',
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    paddingLeft: 30,
    borderRadius: 20,
  },
  searchBarBtnText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default App;
