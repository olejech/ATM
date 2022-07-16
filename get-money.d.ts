export declare const delay: (ms: number) => Promise<void>
export declare const createATM: (
  nominalsMap: Record<number, number>
) => (amount: number) => Promise<void>
