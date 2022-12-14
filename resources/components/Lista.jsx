import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const Container = styled.div`
    padding: 16px;
    border: 1px solid #e0e0e0;
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
        0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
    height: calc(100vh - 120px);

    & > hr {
        margin-left: -16px;
        margin-right: -16px;
        height: 1px;
        background: #e0e0e0;
        border: 0;
        margin-bottom: 0;
    }

    & > .conteudo {
        height: calc(100% - 34px);
        margin-left: -16px;
        margin-right: -16px;
        overflow-y: scroll;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
`;

export function Lista({ name, cards }) {
    return (
        <Container>
            <Typography variant="h4" className="header">
                {name}
            </Typography>
            <hr />
            <div className="conteudo">{cards}</div>
        </Container>
    );
}
