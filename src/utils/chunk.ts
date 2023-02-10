/**
 * Chunks an array into smaller arrays of a specified size.
 *
 * @template T
 * @param {T[]} items - The array to be chunked.
 * @param {number} chunk - The size of each chunk.
 * @returns {T[][]} An array of chunks, each of the specified size.
 */

export function chunk<T>(items: T[], chunk: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < items.length; i += chunk) {
        chunks.push(items.slice(i, i + chunk))
    }
    return chunks
}