import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { API_URL, API_TOKEN } from '@env';

export default function MovieList(props) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/movies/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${API_TOKEN}`
            }
        })
            .then(res => res.json())
            .then(jsonRes => setMovies(jsonRes))
            .catch(error => console.log(error));
    }, []);

    const movieClicked = (movie) => {
        props.navigation.navigate("Detail", { movie: movie, title: movie.title })
    }

    return (
        <View>
            <View style={{ backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: 'orange' }}>
                <Image source={require('../assets/MR_logo.png')}
                    style={{ width: '100%', height: 135, paddingTop: 30 }}
                    resizeMode="contain" />
            </View>
            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => movieClicked(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>

                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: '#282C35'

    },
    itemText: {

        color: '#ffffff',
        fontSize: 24
    }
});