import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { HomeHeader, HomeList, HomeChip } from '@components/index'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../config/firebase'
import { collection, getDocs } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
    const [cafes, setCafes] = useState([]);
    const cafesRef = collection(db, "cafes");

    async function loadData() {
        const querySnapshot = await getDocs(collection(db, "cafes"));
        const cafes = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            cafes.push({
                id: doc.id,
                data: doc.data()
            });
        });
        setCafes(cafes);

    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <View style={styles.container}>
            <HomeHeader navigation={navigation} />
            <View style={{ marginTop: 24, marginBottom: 40 }}>
                <Text style={[styles.title, { color: '#6E929D' }]}>Explore</Text>
                <Text style={[styles.title, { color: '#004359' }]}>New Places!</Text>
            </View>
            <HomeChip />
            <HomeList data={cafes} />
            {/* <FlatList
                style={{}}
                data={cafes}
                numColumns={1}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.data.nama_cafe}</Text>
                    </View>
                )}
            /> */}
            {/* <Text>Welcome {user?.email}!</Text> */}
            {/* <Button title="Sign Out" onPress={() => coba()} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 36,
        paddingLeft: 4,
    }
});
