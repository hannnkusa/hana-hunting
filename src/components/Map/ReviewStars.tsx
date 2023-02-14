import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'

export function ReviewStars({ stars }) {
    const FullStar = key => (
        <Icon color='#FFC300' key={key} type='ionicon' name='ios-star' size={12} />
    )

    const HalfStar = key => (
        <Icon color='#FFC300' key={key} type='ionicon' name='md-half-star' size={12} />
    )

    const EmptyStar = key => (
        <Icon color='#FFC300' key={key} type='ionicon' name='ios-star-outline' size={12} />
    )

    const starReviews = () => {
        let result = []
        for (let i = 1; i < 5; i++) {
            let star = FullStar(i);
            if (i > star) {
                star = EmptyStar(i);
            }
            result.push(star)
        }
    }

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            {starReviews}
        </View>
    )
}