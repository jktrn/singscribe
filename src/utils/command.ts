import { Command, CommandCategory, CommandCategoryExtra, CommandExec, CommandMeta } from '../types'

/**
 * Creates a Command object.
 *
 * @param {CommandMeta} meta - The metadata for the command.
 * @param {CommandExec} exec - The function to be executed when the command is called.
 * @returns {Command} The created Command object.
 */
export function command(meta: CommandMeta, exec: CommandExec): Command {
    return {
        meta,
        exec,
    }
}

/**
 * Creates a CommandCategory object.
 *
 * @param {string} name - The name of the category.
 * @param {Command[]} commands - An array of Command objects in the category.
 * @param {CommandCategoryExtra} [extra={}] - Additional properties for the category.
 * @returns {CommandCategory} The created CommandCategory object.
 */
export function category(name: string, commands: Command[], extra: CommandCategoryExtra = {}): CommandCategory {
    return {
        name,
        commands,
        ...extra,
    }
}
