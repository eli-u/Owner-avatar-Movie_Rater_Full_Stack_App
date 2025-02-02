import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Detail({ route, navigation }) {

    const { movie } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: movie.title,
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
            <View style={styles.starContainer}>
                <FontAwesomeIcon style={movie.avg_rating > 0 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 1 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 2 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 3 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 4 ? styles.orange : styles.white} icon={faStar} />
                <Text style={styles.white}>({movie.no_of_ratings})</Text>
            </View>
            <Text style={styles.description}>{movie.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10
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
    }
});
