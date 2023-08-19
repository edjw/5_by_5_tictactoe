import { writable, derived } from 'svelte/store';
import { persist, createIndexedDBStorage } from "@macfja/svelte-persistent-store"

/**
 * @typedef {Object} PlayerAverage
 * @property {number} total
 * @property {number} count
 * @property {number} average
 */

/**
 * @typedef {Object} GameAverage
 * @property {PlayerAverage} X
 * @property {PlayerAverage} O
 */

/**
 * @typedef {Record<string, GameAverage>} AverageScoresType
 */


export const allFinalScores = persist(writable([]), createIndexedDBStorage(), "allFinalScores")

export const averageScoresWritable = writable({
    "dummyTitle": {
        X: { total: 0, count: 0, average: 0 },
        O: { total: 0, count: 0, average: 0 }
    }
});



export const averageScores = persist(averageScoresWritable, createIndexedDBStorage(), "averageScores");



export function saveFinalScores(title, scores) {
    allFinalScores.update(allScores => {
        return [...allScores, {
            title: title,
            scores: scores
        }];
    });
}

/**
 * @type {import('svelte/store').Readable<AverageScoresType>}
 */
export const averageScoresDerived = derived(allFinalScores, ($allFinalScores) => {
    const averages = {};

    $allFinalScores.forEach(game => {
        if (!averages[game.title]) {
            averages[game.title] = {
                X: { total: 0, count: 0 },
                O: { total: 0, count: 0 }
            };
        }

        averages[game.title].X.total += game.scores.X.score;
        averages[game.title].X.count += 1;

        averages[game.title].O.total += game.scores.O.score;
        averages[game.title].O.count += 1;
    });

    // Convert totals to averages
    for (const title in averages) {
        averages[title].X.average = averages[title].X.total / averages[title].X.count;
        averages[title].O.average = averages[title].O.total / averages[title].O.count;
    }

    // Update the writable store with the new averages
    averageScoresWritable.set(averages);

    return averages;
});


