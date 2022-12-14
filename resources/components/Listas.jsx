import styled from "@emotion/styled";
import { Card } from "./Card";
import { Lista } from "./Lista";
import { columnNames, useCards, useIsEditingById } from "./store/cards";

const Container = styled.div`
    padding: 16px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr 1fr;
`;

export function Listas() {
    const cards = useCards();
    const isEditingById = useIsEditingById();

    return (
        <Container>
            {columnNames.map((name) => {
                const myCards = cards.filter(({ lista }) => lista == name);

                return (
                    <Lista
                        key={name}
                        name={name}
                        cards={myCards.map((card) => (
                            <Card
                                key={card.id}
                                {...card}
                                isEditing={isEditingById.has(card.id)}
                            />
                        ))}
                    />
                );
            })}
        </Container>
    );
}
