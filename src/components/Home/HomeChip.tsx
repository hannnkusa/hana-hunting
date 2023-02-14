import React, { useState } from 'react'
import { ButtonGroup } from 'react-native-elements'
import { ScrollView, View, StyleSheet } from 'react-native';

export function HomeChip({ selectedIndex, setSelectedIndex, selectable, isWhiteBG = false }) {
    
    return (
        <View style={{ marginBottom: 23 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ height: 50 }}
            >
                {/* <View></View> */}
                <ButtonGroup
                    buttons={selectable}
                    // selectMultiple
                    selectedIndex={selectedIndex}
                    onPress={(value) => {
                        setSelectedIndex(value);
                    }}
                    containerStyle={{ marginBottom: 20, borderWidth: 0, backgroundColor: 'transparent' }}
                    buttonStyle={{ height: 37, marginRight: 8, borderRadius: 16, backgroundColor: isWhiteBG ? 'white' : 'rgba(172, 206, 217, 0.15)' }}
                    buttonContainerStyle={{ borderRadius: 16 }}
                    innerBorderStyle={{ width: 0 }}
                    textStyle={{ fontSize: 14, fontFamily: 'Inter-Regular', color: '#004359', marginHorizontal: 16 }}
                    selectedButtonStyle={{ backgroundColor: '#004359' }}
                />
                {/* <Text style={styles.subHeader}>Using Components</Text> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    subHeader: {
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10
    }
})