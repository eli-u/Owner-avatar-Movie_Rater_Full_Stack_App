import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function Edit({ route, navigation }) {

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
            <Text style={styles.description}>Edit {movie.title}</Text>
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
    }
});
