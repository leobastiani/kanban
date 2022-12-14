import styled from "@emotion/styled";
import { Cancel, Delete, East, Edit, Save, West } from "@mui/icons-material";
import { Fab, IconButton } from "@mui/material";
import { useState } from "react";

const Container = styled.div`
    border: 1px solid #e0e0e0;
    border-left: 3px solid ${(props) => (props.isEntered ? "blue" : "gray")};
    padding: 16px;

    & > .buttons {
        display: flex;
        justify-content: space-between;
    }

    & > .content {
        max-height: 250px;
        overflow-y: auto;
    }
`;

export function Card({
    isEditing = true,
    titulo = "Title",
    content = "Some content",
}) {
    const [isEntered, setIsEntered] = useState();

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
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
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
                        <IconButton>
                            <Edit />
                        </IconButton>
                    </div>
                )}
            </div>
            <hr />
            <div className="content">
                {isEditing ? (
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ minHeight: "240px", width: "100%" }}
                    />
                ) : (
                    content
                )}
            </div>
            <div style={{ height: "16px" }} />
            <div className="buttons">
                {isEditing ? (
                    <>
                        <Fab size="small" color={isEntered ? "primary" : null}>
                            <Save />
                        </Fab>
                        <Fab size="small" color={isEntered ? "primary" : null}>
                            <Cancel />
                        </Fab>
                    </>
                ) : (
                    <>
                        <Fab size="small" color={isEntered ? "primary" : null}>
                            <West />
                        </Fab>

                        <Fab size="small" color={isEntered ? "primary" : null}>
                            <Delete />
                        </Fab>

                        <Fab size="small" color={isEntered ? "primary" : null}>
                            <East />
                        </Fab>
                    </>
                )}
            </div>
        </Container>
    );
}
