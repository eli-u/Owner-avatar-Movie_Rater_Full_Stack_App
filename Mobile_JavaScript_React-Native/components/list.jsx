import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieList({ navigation }) {
    const [movies, setMovies] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {

        getData();
    }, []);

    // Fetch token and then fetch movies
    const getData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('MR_Token');
            if (storedToken) {
                setToken(storedToken);
                getMovies(storedToken);
            } else {
                navigation.navigate("Auth");
            }
        } catch (error) {
            console.error("Error retrieving token:", error);
        }
    };

    // Fetch movies only when the token is available
    const getMovies = async (authToken) => {
        try {
            const response = await fetch(`${API_URL}/api/movies/`, {
                method: "GET",
                headers: {
                    'Authorization': `Token ${authToken}`,
                },
            });

            const jsonRes = await response.json();
            setMovies(jsonRes);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // Pull-to-refresh action
    const onRefresh = async () => {
        setIsRefreshing(true);
        if (token) {
            await getMovies(token);
        }
        setIsRefreshing(false);
    };

    const movieClicked = (movie) => {
        navigation.navigate("Detail", { movie, title: movie.title, token });
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('MR_Token'); // Clear the token
        navigation.navigate("Auth"); // Navigate back to the Auth screen
    };

    useEffect(() => {
        navigation.setOptions({
            title: "Movie List",
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
            },
            headerTitleAlign: 'center',
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 5
                    }}
                    onPress={() => navigation.navigate("Edit", { movie: { title: '', description: '' } })}
                >
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Add New</Text>
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={{ fontSize: 18, color: 'orange', fontWeight: 'bold', marginLeft: 10 }}>Logout</Text>
                </TouchableOpacity>
            ),

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
                    onRefresh={onRefresh}
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
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    itemText: {
        color: '#ffffff',
        fontSize: 24,
    },
});
