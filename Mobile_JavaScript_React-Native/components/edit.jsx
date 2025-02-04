import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { API_URL, API_TOKEN } from '@env';

export default function Edit({ route, navigation }) {

    const { movie } = route.params;
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: 'orange'
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
            },
            headerTintColor: 'white',
            title: movie.title ? movie.title : "Movie List",
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        backgroundColor: 'orange',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 5
                    }}
                    onPress={() => removeClicked(movie)}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                    >Remove</Text>
                </TouchableOpacity>
            )

        });
    }, [movie]);

    const removeClicked = (movie) => {
        console.log(movie)
        fetch(`${API_URL}/api/movies/${movie.id}/`, {
            method: "DELETE",
            headers: {
                'Authorization': `Token ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                navigation.navigate("MovieList");
            })
            .catch(error => console.log(error));
    }


    const saveMovie = () => {
        if (movie.id) {
            fetch(`${API_URL}/api/movies/${movie.id}/`, {
                method: "PUT",
                headers: {
                    'Authorization': `Token ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: description })
            })
                .then(res => res.json())
                .then(movie => {
                    navigation.navigate("Detail", { movie: movie, title: movie.title });
                })
                .catch(error => console.log(error));
        } else {
            fetch(`${API_URL}/api/movies/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: description })
            })
                .then(res => res.json())
                .then(movie => {
                    navigation.navigate("MovieList");
                })
                .catch(error => console.log(error));
        }

    }


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder='Title'
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder='Description'
                onChangeText={text => setDescription(text)}
                value={description}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => saveMovie()}
            >
                <Text style={styles.buttonText}>{movie.id ? 'Edit' : "Add"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10
    },
    label: {
        fontSize: 24,
        color: 'white',
        padding: 10
    },
    input: {
        fontSize: 24,
        backgroundColor: 'white',
        padding: 10,
        margin: 10
    }, button: {
        backgroundColor: 'orange',
        padding: 12,
        borderRadius: 8,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
