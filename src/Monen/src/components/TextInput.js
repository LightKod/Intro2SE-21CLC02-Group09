import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'
import { useTheme } from 'react-native-paper';

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container} >
      <Text style={styles.description}> {props.content}</Text>
      <Input
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        contentStyle={styles.input}
        mode="outline"
        textColor='#FFFBFB'
        outlineStyle={{ borderRadius: 20,display: 'flex', backgroundColor: '#191919' }}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    display: 'flex',
 

  },
  input: {
    backgroundColor: '#191919',
    fontFamily: 'Montserrat_400Regular',
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingBottom: 8,
    fontFamily: 'Montserrat_400Regular',
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})
