/**
 * Creates an identifier string using a namespace and additional arguments.
 *
 * @param {string} namespace - The namespace for the identifier.
 * @param {...unknown[]} args - Additional arguments to be included in the identifier.
 * @returns {string} The created identifier string.
 */

export function createId(namespace: string, ...args: unknown[]): string {
    return `${namespace};${args.join(';')}`
}

/**
 * Reads an identifier string and returns its namespace and arguments.
 *
 * @param {string} id - The identifier string to be read.
 * @returns {[namespace: string, ...args: string[]]} An array containing the namespace and arguments of the identifier.
 */

export function readId(id: string): [namespace: string, ...args: string[]] {
    const [namespace, ...args] = id.split(';')
    return [namespace, ...args]
}