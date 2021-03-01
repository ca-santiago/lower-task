/**
 * Save a file and return the access URL
 */
export type saveFile = (file: Buffer, fileName: string) => Promise<string>;
