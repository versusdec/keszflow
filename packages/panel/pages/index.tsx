import React from 'react';
import type {ReactElement} from 'react'

import {View} from "@keszflow/components";
import {Home as HomeComponent} from "@keszflow/components";

const Home = () => <HomeComponent />

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <View title={'Dashboard'}>
            {page}
        </View>
    )
}

export default Home