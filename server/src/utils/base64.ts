/**
 * Encode base64
 */
export const encodeBase64 = (data: string) => {
  return Buffer.from(data, 'utf8').toString('base64');
};

/**
 * Decode base64
 */
export const decodeBase64 = (base64: string) => {
  return Buffer.from(base64, 'base64').toString('utf-8');
};
