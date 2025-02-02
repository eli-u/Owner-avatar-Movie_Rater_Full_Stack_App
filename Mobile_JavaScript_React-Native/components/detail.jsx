import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { API_URL, API_TOKEN } from '@env';

export default function Detail({ route, navigation }) {

    const { movie } = route.params;
    const [highlight, setHighlight] = useState(0);

    const rateClicked = () => {
        if (highlight > 0 && highlight < 6) {
            fetch(`${API_URL}/api/movies/${movie.id}/rate_movie/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ stars: highlight })
            })
                .then(res => res.json())
                .then(res => {
                    setHighlight(0);
                    Alert.alert("Rating", res.message);
                })
                .catch(error => Alert.alert("Error", error));
        }
    }

    useEffect(() => {
        navigation.setOptions({
            // title: movie.title,
            headerStyle: {
                backgroundColor: 'orange'
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
                // color: 'white',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        backgroundColor: 'orange',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 5
                    }}
                    onPress={() => navigation.navigate("Edit", { movie: movie })}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                    >Edit</Text>
                </TouchableOpacity>
            )
        });
    }, [movie, navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.starContainer}>
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                        key={index}
                        style={movie.avg_rating > index ? styles.orange : styles.white}
                        icon={faStar}
                    />
                ))}
                <Text style={styles.white}>({movie.no_of_ratings})</Text>
            </View>

            <Text style={styles.description}>{movie.description}</Text>

            <View style={{ borderBottomColor: 'purple', borderBottomWidth: 2 }} />
            <Text style={styles.description}>Rate the movie!</Text>

            <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <TouchableOpacity key={value} onPress={() => setHighlight(value)}>
                        <FontAwesomeIcon
                            style={highlight >= value ? styles.purple : styles.grey}
                            icon={faStar}
                            size={48}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <Button title="Rate" onPress={() => rateClicked()} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 20,
        color: 'white',
        padding: 10
    },
    starContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    orange: {
        color: 'orange'
    },
    white: {
        color: 'white'
    },
    purple: {
        color: 'purple'
    },
    grey: {
        color: '#ccc'
    }
});
