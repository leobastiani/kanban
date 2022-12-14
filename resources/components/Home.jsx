import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Listas } from "./Listas";

const navItems = ["Home", "About", "Contact"];

export function Home() {
    return (
        <>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        Kanban
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="main">
                <Toolbar />
                <Listas />
                <Fab
                    sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                    }}
                    aria-label="Add"
                    color="primary"
                >
                    <Add />
                </Fab>
            </Box>
        </>
    );
}
