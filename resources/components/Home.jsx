import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { Listas } from "./Listas";
import { useCards, useEditingById, useIsEditingById } from "./store/cards";

export function Home() {
    useEffect(() => {
        (async () => {
            const formData = new FormData();
            formData.append("email", "some@email.com");
            formData.append("password", "123456");
            const resp = await axios.post("/login", formData);

            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${resp.data}`;

            const { data: cards } = await axios.get("/cards");
            useCards.setState(cards, true);
        })();
    }, []);

    const addHandle = useCallback(() => {
        const id = Number.MAX_SAFE_INTEGER;
        const cards = useCards.getState();
        if (cards[0]?.id == id) {
            return;
        }
        useCards.setState(
            [
                {
                    id,
                    titulo: "",
                    conteudo: "",
                    lista: "ToDo",
                },
                ...cards,
            ],
            true
        );
        const newValue = [...useIsEditingById.getState(), id];
        useEditingById[id].setState({
            titulo: "",
            conteudo: "",
        });
        useIsEditingById.setState(new Set(newValue), true);
    }, []);

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
                    onClick={addHandle}
                >
                    <Add />
                </Fab>
            </Box>
        </>
    );
}
