import create from "zustand";

export const useCards = create(() => []);
export const useIsEditingById = create(() => new Set());
const useEditingByIdStores = {};
export const useEditingById = new Proxy(
    {},
    {
        get(target, value) {
            return (useEditingByIdStores[value] ??= create(() => ({})));
        },
    }
);

export function replaceCard(id, newCard) {
    const cards = useCards.getState();
    useCards.setState(
        cards.map((c) => (c.id != id ? c : { ...c, ...newCard })),
        true
    );
}

export const columnNames = ["ToDo", "Doing", "Done"];

export function isNewCard(cardId) {
    return cardId == Number.MAX_SAFE_INTEGER;
}
