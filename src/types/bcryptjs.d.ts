declare module 'bcryptjs' {
    /**
     * Generate a salt synchronously
     * @param {number} rounds - Number of rounds to use, defaults to 10 if omitted
     * @returns {string} - Generated salt
     */
    export function genSaltSync(rounds?: number): string;

    /**
     * Generate salt asynchronously
     * @param {number} rounds - Number of rounds to use, defaults to 10 if omitted
     * @returns {Promise<string>} - Generated salt
     */
    export function genSalt(rounds?: number): Promise<string>;

    /**
     * Hash data synchronously
     * @param {string | Buffer} data - Data to hash
     * @param {string | number} saltOrRounds - Salt or number of rounds
     * @returns {string} - Hashed data
     */
    export function hashSync(data: string | Buffer, saltOrRounds: string | number): string;

    /**
     * Hash data asynchronously
     * @param {string | Buffer} data - Data to hash
     * @param {string | number} saltOrRounds - Salt or number of rounds
     * @returns {Promise<string>} - Hashed data
     */
    export function hash(data: string | Buffer, saltOrRounds: string | number): Promise<string>;

    /**
     * Compare data with hash synchronously
     * @param {string | Buffer} data - Data to compare
     * @param {string} encrypted - Data to be compared to
     * @returns {boolean} - True if matching, false otherwise
     */
    export function compareSync(data: string | Buffer, encrypted: string): boolean;

    /**
     * Compare data with hash asynchronously
     * @param {string | Buffer} data - Data to compare
     * @param {string} encrypted - Data to be compared to
     * @returns {Promise<boolean>} - True if matching, false otherwise
     */
    export function compare(data: string | Buffer, encrypted: string): Promise<boolean>;

    /**
     * Get number of rounds used to encrypt hash
     * @param {string} encrypted - Hash from which to extract round count
     * @returns {number} - Number of rounds used
     */
    export function getRounds(encrypted: string): number;
} 