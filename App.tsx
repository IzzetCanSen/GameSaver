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

function App(): JSX.Element {
  const [gameName, setGameName] = React.useState('');
  const [foundDeal, setFoundDeal] = React.useState(false);
  const [dealGame, setDealGame] = React.useState('');
  const [dealStore, setDealStore] = React.useState('');
  const [dealPrice, setDealPrice] = React.useState('');
  const [gameNotFound, setGameNotFound] = React.useState(false);

  function fetchStoreFromId(storeID: string) {
    const url = 'https://cheapshark-game-deals.p.rapidapi.com/stores';

    try {
      fetch(url, options)
        .then(response => response.json())
        .then(json => {
          json.forEach(store => {
            if (store.storeID === storeID) {
              console.log(store.storeName);
              setDealStore(store.storeName);
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
          if (json.length > 0) {
            console.log(json[0].internalName);
            console.log(json[0].title);
            console.log(json[0].salePrice);

            setDealGame(json[0].title);
            setDealPrice(json[0].salePrice);

            fetchStoreFromId(json[0].storeID);
            setFoundDeal(true);
            setGameNotFound(false);
          } else {
            console.log('No data found.');
            setFoundDeal(false);
            setGameNotFound(true);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  function transformString(input: string) {
    const transformedString = input.replace(/\s/g, '').toLowerCase();
    setGameName(transformedString);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchBarTitle}>Game</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="ARK Survival Evolved..."
          placeholderTextColor="#eeeeee"
          onChangeText={transformString}
        />
        <TouchableOpacity
          style={styles.searchBarBtn}
          onPress={() => getCheapestGame(gameName)}>
          <Text style={styles.searchBarBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      {foundDeal && (
        <View style={styles.resultContainer}>
          <Text style={styles.searchBarTitle}>Game: {dealGame}</Text>
          <Text style={styles.searchBarTitle}>Store: {dealStore}</Text>
          <Text style={styles.searchBarTitle}>Price: {dealPrice}</Text>
        </View>
      )}
      {gameNotFound && (
        <View style={styles.resultContainer}>
          <Text style={styles.searchBarTitle}>Game not found</Text>
        </View>
      )}
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
    color: '#ffffff',
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
  resultContainer: {
    rowGap: 10,
    marginTop: 50,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
});

export default App;
