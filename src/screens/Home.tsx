import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { HomeHeader, HomeList, HomeChip } from '@components/index'
import { db } from '../config/firebase'
import { collection, getDocs } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
    const [cafes, setCafes] = useState([]);
    const [cafesFiltered, setCafesFiltered] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const selectable = ['Ambience', 'Value of Money', 'Service', 'Taste']

    async function loadData() {
        const cafes = []
        setIsLoading(true)
        const querySnapshot = await getDocs(collection(db, "cafes"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            cafes.push({
                ...doc.data(),
                id: doc.id
            });
        });
        setCafes(cafes);
        setIsLoading(false)
    }

    useEffect(() => {
        loadData()
    }, []);

    useEffect(() => {
        setIsLoading(true)
        const newCafes = cafes.sort((a, b) => {
            const selector = selectedIndex === 1 ? 'value' : selectable[selectedIndex].toLowerCase()
            return a[selector] - b[selector]
        })
        setCafesFiltered(newCafes)
        setIsLoading(false)
    }, [selectedIndex])

    return (
        <View style={styles.container}>
            <HomeHeader navigation={navigation} />
            <View style={{ marginTop: 24, marginBottom: 40 }}>
                <Text style={[styles.title, { color: '#6E929D' }]}>Explore</Text>
                <Text style={[styles.title, { color: '#004359' }]}>New Places!</Text>
            </View>
            <HomeChip selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} selectable={selectable} />
            <HomeList data={!!selectedIndex ? cafesFiltered : cafes} navigation={navigation} isLoading={isLoading} />
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
