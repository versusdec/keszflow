import React from 'react'
import {Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody,} from '@mui/material'
import {ActionButton} from "../../elements/actionButton";
import {LaunchOutlined, Edit, DeleteOutline} from '@mui/icons-material';

export const Item = ({data}: { data: any }) => {

    return (
        <>
            <TableRow>
                <TableCell>{data.id}</TableCell>
                <TableCell align="left">{data.name}</TableCell>
                <TableCell align="left">{data.date}</TableCell>
                <TableCell align="left">{data.total}</TableCell>
                <TableCell align="left">{data.status}</TableCell>
                <TableCell align="right">
                    <ActionButton onClick={(e: MouseEvent) => {
                        console.log(e)
                    }} Icon={LaunchOutlined} tooltip={'Open'} />
                    <ActionButton onClick={(e: MouseEvent) => {
                        console.log(e)
                    }} Icon={Edit} tooltip={'Edit'} /><ActionButton onClick={(e: MouseEvent) => {
                        console.log(e)
                    }} Icon={DeleteOutline} tooltip={'Delete'} />

                </TableCell>
            </TableRow>
        </>
    )
}

const data = [
    {
        id: 1,
        date: '2022.04.15',
        name: 'My invoice',
        total: 1500,
        status: 'active'
    },
    {
        id: 2,
        date: '2022.04.15',
        name: 'My invoice',
        total: 24158,
        status: 'active'
    },
    {
        id: 3,
        date: '2022.04.15',
        name: 'My invoice',
        total: 4561,
        status: 'active'
    },
    {
        id: 4,
        date: '2022.04.15',
        name: 'My invoice',
        total: 48945,
        status: 'active'
    },
    {
        id: 5,
        date: '2022.04.15',
        name: 'My invoice',
        total: 1245,
        status: 'active'
    },

]

export const List = () => {


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <Item key={row.id} data={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}