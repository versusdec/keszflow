import type {ReactElement} from 'react'

import {View} from "../src/layouts/View";
import {Home as HomeComponent} from "../src/pages/Home";

const Home = () => <HomeComponent/>

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <View>
            {page}
        </View>
    )
}

export default Home