import { gridArray, playerScores, turn, numberOfTurnsTaken, gridArrayBuilder } from "$lib/store/store";

export function resetGameState() {
    gridArray.set(JSON.parse(JSON.stringify(gridArrayBuilder))); // This is to reset the items inside the nested directions array too
    playerScores.reset();
    turn.set("X");
    numberOfTurnsTaken.set(0);
}