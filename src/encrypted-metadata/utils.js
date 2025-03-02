/**
 * Checks if the input matches the given schema.
 * @param {import('@ucanto/core/schema/type.js').Schema} schema
 * @param {any} input
 * @returns {boolean} - True if the input matches the schema, false otherwise.
 * */
export const matchesSchema = (schema, input) => {
  try {
    schema.from(input)
    return true
  } catch (error) {
    return false
  }
}

/**
 *
 * @param {string} str
 * @returns {Uint8Array}
 */
export function stringToBytes(str) {
  return new TextEncoder().encode(str)
}

/**
 *
 * @param {Uint8Array} bytes
 * @returns {string}
 */
export function bytesToString(bytes) {
  return new TextDecoder().decode(bytes)
}
