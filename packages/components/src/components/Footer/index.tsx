import {Box, Paper, Typography} from "@mui/material";


export const Footer = () => {
    return (
        <>
            <Paper elevation={3} square sx={{
                bgcolor: 'grey.100',
                position: 'sticky',
                bottom: 0
            }}>
                <Box component={'footer'}  p={1}>
                    <Typography variant="caption">All rights reserved. {new Date().getFullYear()} ©</Typography>
                </Box>
            </Paper>
        </>
    )
}
