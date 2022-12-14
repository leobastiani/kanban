import styled from "@emotion/styled";
import { Cancel, Delete, East, Edit, Save, West } from "@mui/icons-material";
import { Fab, IconButton } from "@mui/material";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useCallback, useState } from "react";
import {
    columnNames,
    isNewCard,
    replaceCard,
    useCards,
    useEditingById,
    useIsEditingById,
} from "./store/cards";

const Container = styled.div`
    border: 1px solid #e0e0e0;
    border-left: 3px solid ${(props) => (props.isEntered ? "blue" : "gray")};
    padding: 16px;

    & > .title {
        display: flex;
    }

    & > .buttons {
        display: flex;
        justify-content: space-between;
    }

    & > .conteudo {
        max-height: 250px;
        overflow-y: auto;
    }
`;

export function Card({ id, isEditing, titulo, conteudo, lista }) {
    const [isEntered, setIsEntered] = useState();
    const handleEdit = useCallback(() => {
        const newValue = [...useIsEditingById.getState(), id];
        useEditingById[id].setState({
            titulo,
            conteudo,
        });
        useIsEditingById.setState(new Set(newValue), true);
    }, [titulo, conteudo, id]);
    const handleCancel = useCallback(() => {
        if (isNewCard(id)) {
            useCards.setState(
                useCards.getState().filter((c) => c.id != id),
                true
            );
            return;
        }
        const newValue = new Set([...useIsEditingById.getState()]);
        newValue.delete(id);
        useIsEditingById.setState(newValue, true);
    }, [id]);
    const handleSave = useCallback(() => {
        const newValue = new Set([...useIsEditingById.getState()]);
        newValue.delete(id);
        useIsEditingById.setState(newValue, true);

        const data = useEditingById[id].getState();
        replaceCard(id, data);
        if (isNewCard(id)) {
            (async () => {
                const {
                    data: { id: newId },
                } = await axios.post(`/cards`, { ...data, lista });
                replaceCard(id, { id: newId });
            })();
        } else {
            axios.put(`/cards/${id}`, { ...data, lista });
        }
    }, [id, lista]);
    const changeEdit = useCallback((propName, newValue) => {
        useEditingById[id].setState({
            ...useEditingById[id].getState(),
            [propName]: newValue,
        });
    });
    const editingValue = useEditingById[id]();

    const handleMove = useCallback(
        (direction) => {
            const newLista =
                columnNames[columnNames.indexOf(lista) + direction];
            replaceCard(id, { lista: newLista });
            axios.put(`/cards/${id}`, { lista: newLista, titulo, conteudo });
        },
        [titulo, conteudo, id]
    );

    const deleteHandle = useCallback(() => {
        useCards.setState(
            useCards.getState().filter((c) => c.id != id),
            true
        );
        axios.delete(`/cards/${id}`);
    }, [id]);

    return (
        <Container
            onMouseEnter={() => setIsEntered(true)}
            onMouseLeave={() => setIsEntered(false)}
            isEntered={isEntered}
        >
            <div className="title">
                {isEditing ? (
                    <input
                        type="text"
                        style={{
                            width: "100%",
                            border: 0,
                        }}
                        value={editingValue.titulo}
                        onChange={(e) => changeEdit("titulo", e.target.value)}
                    />
                ) : (
                    titulo
                )}
                {!isEditing && (
                    <div
                        style={{
                            display: "inline-block",
                            float: "right",
                        }}
                    >
                        <IconButton onClick={handleEdit}>
                            <Edit />
                        </IconButton>
                    </div>
                )}
            </div>
            <hr />
            <div className="conteudo">
                {isEditing ? (
                    <textarea
                        value={editingValue.conteudo}
                        onChange={(e) => changeEdit("conteudo", e.target.value)}
                        style={{ minHeight: "240px", width: "100%" }}
                    />
                ) : (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(marked.parse(conteudo)),
                        }}
                    />
                )}
            </div>
            <div style={{ height: "16px" }} />
            <div className="buttons">
                {isEditing ? (
                    <>
                        <Fab
                            size="small"
                            color={isEntered ? "primary" : null}
                            onClick={handleSave}
                        >
                            <Save />
                        </Fab>
                        <Fab
                            size="small"
                            color={isEntered ? "primary" : null}
                            onClick={handleCancel}
                        >
                            <Cancel />
                        </Fab>
                    </>
                ) : (
                    <>
                        <Fab
                            size="small"
                            color={isEntered ? "primary" : null}
                            onClick={() => handleMove(-1)}
                            disabled={columnNames.indexOf(lista) == 0}
                        >
                            <West />
                        </Fab>

                        <Fab
                            size="small"
                            color={isEntered ? "primary" : null}
                            onClick={deleteHandle}
                        >
                            <Delete />
                        </Fab>

                        <Fab
                            size="small"
                            color={isEntered ? "primary" : null}
                            onClick={() => handleMove(1)}
                            disabled={columnNames.indexOf(lista) == 2}
                        >
                            <East />
                        </Fab>
                    </>
                )}
            </div>
        </Container>
    );
}
