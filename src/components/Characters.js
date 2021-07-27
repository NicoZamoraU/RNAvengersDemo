import React, { Component } from 'react'
import {
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
} from 'react-native'

class Characters extends Component {
  render() {
    const { data, onPressCharacter } = this.props

    return (
      <ScrollView style={styles.charactersScrollView}>
        <View style={styles.charactersContainer}>
          {data.map((character, i) => {
            return (
              <TouchableHighlight
                key={character.id}
                onPress={() => onPressCharacter(character)}
                underlayColor='#C4C4C4'
                activeOpacity={0.8}
              >
                <View style={styles.charContainer}>
                  <Image
                    resizeMode='contain'
                    source={{
                      uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                    }}
                    style={styles.charImage}
                  />
                  <View>
                    <Text style={styles.charText}>{character.name}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )
          })}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  charactersScrollView: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flex: 1,
  },
  charactersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  charContainer: {
    display: 'flex',
    width: 150,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  charImage: {
    height: 150,
    width: 150,
  },
  charText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Characters
