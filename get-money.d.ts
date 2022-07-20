type NominalsMap = Record<number, number>
type Nominal = [string, number]

export declare const delay: (ms: number) => Promise<void>
export declare const createATM: (
  nominalsMap: NominalsMap
) => (amount: number) => Promise<NominalsMap>
export declare const parseNominalsMap: (nominalsMap: NominalsMap) => {
  allSum: number
  nominals: Nominal[]
}
export declare const getNominals: (
  nominals: Nominal[],
  amount: number
) => {
  currentAmount: number
  result: NominalsMap
}
