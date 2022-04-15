import Link from "next/link";
import {Box, Typography} from "@mui/material";
import {api} from "@keszflow/panel/api";
import {List as Invoices} from "@keszflow/components";
import {useEffect, useState} from "react";

const test = async () => {

    const data = await api.test.fetch().then(res => res.json())
    return data
}
const useData = () => {


    return {
        data: {}
    }
}
export const Home = () => {
    console.log('Home inited')
    const [data, setData] = useState({})

    useEffect(() => {
        const d = async () => {
            setData(await test())
        }

        d()
    }, [])
    console.log(data);


    return (
        <Box p={3}>
            <Typography variant={'h4'} mb={3}>Dashboard</Typography>
            <Box sx={{

            }}>
                <Invoices/>
            </Box>

        </Box>
    )
}
