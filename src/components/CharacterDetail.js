import React from 'react'
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native'

const CharacterDetail = ({ detailData, characterInfo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.charContainer}>
        <Image
          resizeMode='contain'
          source={{
            uri: `${characterInfo.thumbnail.path}.${characterInfo.thumbnail.extension}`,
          }}
          style={styles.detailCharImage}
        />
        <View style={{ alignItems: 'flex-start' }}>
          <Text
            style={[styles.detailCharText, { color: '#C6C6C6', marginTop: 20 }]}
          >
            PERSONAJE
          </Text>
          <Text style={styles.detailCharText}>{characterInfo.name}</Text>
        </View>
      </View>
      <ScrollView style={styles.detailScrollView}>
        <View style={styles.detailContainer}>
          {detailData.map((comic, i) => {
            return (
              <View key={comic.id} style={styles.detailComicContainer}>
                <Image
                  resizeMode='contain'
                  source={{
                    uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
                  }}
                  style={styles.detailComicImage}
                />
                <View>
                  <Text style={styles.detailComicText}>{comic.name}</Text>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  detailScrollView: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flex: 1,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  detailComicContainer: {
    display: 'flex',
    width: 100,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  detailComicImage: {
    height: 150,
    width: 150,
  },
  detailComicText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Charaacter
  charContainer: {
    display: 'flex',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  detailCharImage: {
    margin: 10,
    height: 150,
    width: 150,
  },
  detailCharText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
})

export default CharacterDetail
