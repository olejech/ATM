const { createATM } = require('../get-money.js')
console.log('~ createATM', createATM)

describe('Get money', () => {
  it('should give money', async () => {
    const getMoney = createATM({ 5000: 1, 1000: 2, 100: 4 })

    const result = await getMoney(6200)

    expect(result).toEqual({ 100: 2, 1000: 1, 5000: 1 })
  })

  it('should not give money if have not this amount', async () => {
    const getMoney = createATM({ 5000: 1, 1000: 2, 100: 4 })

    expect(async () => await getMoney(16200)).rejects.toThrow('have not money')
  })

  it('should give all type of banknotes', async () => {
    const getMoney = createATM({ 5000: 1, 1000: 1, 100: 1 })

    const result = await getMoney(6100)

    expect(result).toEqual({ 100: 1, 1000: 1, 5000: 1 })
  })

  it('should give path of banknotes', async () => {
    const getMoney = createATM({ 5000: 1, 1000: 0, 100: 1 })

    const result = await getMoney(5100)

    expect(result).toEqual({ 100: 1, 5000: 1 })
  })

  it('should give path of banknotes', async () => {
    const getMoney = createATM({ 5000: 2, 1000: 0, 100: 1 })

    const result = await getMoney(10000)

    expect(result).toEqual({ 5000: 2 })
  })

  it('should give path of banknotes', async () => {
    const getMoney = createATM({ 5000: 10, 1000: 5, 100: 10 })

    const result = await getMoney(26800)

    expect(result).toEqual({ 5000: 5, 1000: 1, 100: 8 })
  })

  it('should give banknotes', async () => {
    const getMoney = createATM({
      5000: 15,
      2000: 5,
      1000: 9,
      500: 4,
      200: 5,
      100: 10,
      50: 2,
    })

    const result = await getMoney(58350)

    expect(result).toEqual({
      5000: 11,
      2000: 1,
      1000: 1,
      200: 1,
      100: 1,
      50: 1,
    })
  })
})
