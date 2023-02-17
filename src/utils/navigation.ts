import { CommonActions, StackActions } from "@react-navigation/native";
import { navigationRef } from "@navigation";

export function NewRoute(name = '', params = {}) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name, params }]
            })
        )
    }
}

export function Redirect(name: never, params: never) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params)
    }
}

export function GoBack() {
    if (navigationRef.isReady()) {
        navigationRef.goBack()
    }
}

export function Replace(name: never, params: never) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            StackActions.replace(name, params)
        )
    }
}
