import {Dashboard, Article} from '@mui/icons-material'
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useEffect, useState} from "react";


export const Sidebar = () => {
    const {pathname} = useRouter();

    return (
        <Box component={'aside'} sx={{
            height: '100%',
            maxHeight: '100vh',
            py: 3,
            width: 260,
            bgcolor: 'info.dark',
            color: 'primary.contrastText',
            '.logo': {
                height: 30,
                m: 'auto',
                filter: 'invert(100%)'
            },
            position: 'sticky',
            top: 0
        }}>
            <img src='/img/vercel.svg' alt="logo" className={'logo'}/>
            <List sx={{
                mt: 2
            }}>
                <ListItem disablePadding>
                    <Link href={'/'}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Dashboard sx={{
                                    color: pathname === '/' ?  'secondary.light' : 'white'
                                }}/>
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link href={'/invoices'}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Article sx={{
                                    color: pathname === '/invoices' ?  'secondary.light' : 'white'
                                }}/>
                            </ListItemIcon>
                            <ListItemText primary="Invoices"/>
                        </ListItemButton>
                    </Link>
                </ListItem>

            </List>
        </Box>

    )
}
