import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import NasaInfo from '../components/NasaInfo';

export default function Home({navigation}) {
    return (
       <ScrollView>
        <View style={styles.container}>
            <NasaInfo/>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
});
