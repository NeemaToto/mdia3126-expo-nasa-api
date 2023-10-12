import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Button } from 'react-native';
import { GluestackUIProvider, Text, Box, View, ScrollView } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { Image } from 'expo-image';

export default function NasaInfo() {
    const myAPI = process.env.EXPO_PUBLIC_API;
    const year = '2023';
    const month = '01';
    const day = '01';

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [data, setData] = useState();

    const url = `https://api.nasa.gov/EPIC/api/natural/date/${year}-${month}-${day}?&api_key=${myAPI}`;



    useEffect(() => {
        axios.get(url)
            .then((response) => {
                console.clear();
                console.log(response)
                setData(response.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <GluestackUIProvider config={config}>
            {
                data && data.map((a, index) => {
                    return (
                        <View style={styles.container} key={index}>

                            {/* <div>{a.caption.toUpperCase()}</div> */}
                            {/* January 1, 2023 */}
                            <View style={styles.imgCaptionContainer}>
                                <Image style={{ width: 200, height: 200 }} source={`https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${a.image}.png`} />
                                <View style={styles.imgnumCaptionContainer}>
                                    <Text style={styles.text}>Image #{index + 1}</Text>
                                    <Text style={styles.captionText}>{a.caption.toUpperCase()}</Text>
                                </View>
                            </View>
                            <Box bg="#f4511e" p="$5" w={400} style={{ borderRadius: 10 }}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>Date: {monthNames[Number(a.date.slice(5, 7)) - 1]} {Number(a.date.slice(8, 10))}, {Number(a.date.slice(0, 4))}</Text>
                                    <Text style={styles.text}>x: {a.centroid_coordinates.lat.toFixed(2)} y: {a.centroid_coordinates.lon.toFixed(2)}</Text>
                                </View>
                            </Box>
                        </View>
                    )
                })
            }
        </GluestackUIProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
    },
    text: {
        color: 'white',
        textAlign: 'right'
    },
    captionText: {
        color: 'white',
        textAlign: 'right',
        paddingRight: 10
    },
    imgCaptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%'
    },
    imgnumCaptionContainer: {
        gap: 20
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})