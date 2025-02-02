import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { API_URL, API_TOKEN } from '@env';

export default function Edit({ route, navigation }) {

    const { movie } = route.params;
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);

    const saveMovie = () => {
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
            <Button
                onPress={() => saveMovie()}
                title='Save'
            />
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
    }
});
