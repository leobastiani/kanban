import styled from "@emotion/styled";
import { Lista } from "./Lista";

const Container = styled.div`
    padding: 16px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
`;

export function Listas() {
    return (
        <Container>
            <Lista />
            <Lista />
            <Lista />
        </Container>
    );
}
