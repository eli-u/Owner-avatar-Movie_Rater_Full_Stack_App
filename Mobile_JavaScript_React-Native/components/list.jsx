import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { API_URL, API_TOKEN } from '@env';

export default function MovieList({ navigation }) {
    const [movies, setMovies] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    // Function to fetch movies from the API
    const fetchMovies = () => {
        fetch(`${API_URL}/api/movies/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${API_TOKEN}`,
            },
        })
            .then(res => res.json())
            .then(jsonRes => setMovies(jsonRes))
            .catch(error => console.log(error));
    };

    // Function to handle the pull-to-refresh action
    const onRefresh = () => {
        setIsRefreshing(true);
        // Simulate a network call and prepend new data
        setTimeout(() => {
            fetchMovies(); // Fetch new data and update the list
            setIsRefreshing(false); // Stop refreshing
        }, 1500);
    };

    const movieClicked = (movie) => {
        navigation.navigate("Detail", { movie: movie, title: movie.title });
    };

    useEffect(() => {
        navigation.setOptions({
            title: "Movie List",
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
                // color: 'white',
            },
            headerTitleAlign: 'center',
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 5
                    }}
                    onPress={() => navigation.navigate("Edit", { movie: { title: '', describtion: '' } })}
                >
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                    >Add New</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <FlatList
            data={movies}
            renderItem={({ item }) => (
                <TouchableOpacity key={item.id} onPress={() => movieClicked(item)}>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh} // Trigger onRefresh when pulled
                    tintColor="orange"
                    title="Pull to Refresh"
                    titleColor="orange"
                />
            }
            ListHeaderComponent={
                <View style={{ backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: 'orange' }}>
                    <Image
                        source={require('../assets/MR_logo.png')}
                        style={{ width: '100%', height: 135, paddingTop: 30 }}
                        resizeMode="contain"
                    />
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: '#282C35',
        borderBottomWidth: 0, // Remove bottom border
        borderTopWidth: 0, // Remove top border
    },
    itemText: {
        color: '#ffffff',
        fontSize: 24,
    },
});
