/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useCallback } from 'react'
import {
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
} from 'react-native'
import md5 from 'md5'
import axios from 'axios'
import _ from 'lodash'

import config from './src/config'

const hash = md5(config.ts + config.privateKey + config.publicKey)

axios.defaults.params = {
  ts: config.ts,
  apikey: config.publicKey,
  hash,
}

const App = () => {
  const [characters, setCharacters] = useState([])
  const [searchText, setSearchText] = useState('')
  const [detail, setDetail] = useState({
    characterInfo: {},
    data: [],
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    searchCharacter(searchText)
  }, [searchText])

  const searchCharacter = useCallback(
    _.debounce(text => {
      if (text !== '') {
        getCharacter(text)
      }
      if (text === '') {
        fetchData()
      }
    }, 1000),
    [],
  )

  const getCharacter = async name => {
    try {
      const {
        data: { data: charactersDataBySearchText },
      } = await axios.get(
        'https://gateway.marvel.com:443/v1/public/characters',
        {
          params: {
            nameStartsWith: name,
          },
        },
      )

      setCharacters(charactersDataBySearchText.results)
    } catch (error) {
      console.log({ error })
    }
  }

  async function fetchData() {
    try {
      const {
        data: { data: charactersData },
      } = await axios.get('https://gateway.marvel.com:443/v1/public/characters')

      setCharacters(charactersData.results)
    } catch (error) {
      console.log({ error })
    }
  }

  const onPressCharacter = async char => {
    try {
      const {
        comics: { collectionURI },
      } = char

      const { data: resultDetail } = await axios.get(collectionURI)

      setDetail({
        characterInfo: char,
        data: resultDetail.data.results,
      })
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle='light-content' />
      <View style={styles.header}>
        {detail.data.length !== 0 && (
          <TouchableHighlight
            onPress={() => setDetail({ title: '', data: [] })}
            style={styles.arrowBack}
          >
            <Text style={styles.textArrowBack}>{'<'}</Text>
          </TouchableHighlight>
        )}
        <Image
          resizeMode='contain'
          source={require('./src/assets/images/marvelLogo.png')}
          style={styles.headerImage}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EC1D24',
  },
  headerImage: {
    height: '100%',
    width: 200,
  },
  arrowBack: {
    position: 'absolute',
    left: 0,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArrowBack: {
    color: 'white',
    fontSize: 40,
  },
  textInput: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    color: '#000000',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  searchInput: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App
