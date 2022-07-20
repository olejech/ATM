const DURATIONS = { 5000: 500, 1000: 400, 500: 300, 100: 200, 50: 100 }
const ERROR_MESSAGE = 'have not money'
const delay = ms => new Promise(r => setTimeout(r, ms))

const parseNominalsMap = nominalsMap => {
  return Object.entries(nominalsMap).reduce((acc, [nominal, count], _, arr) => {
    acc += nominal * count
    return {
      allSum: acc,
      nominals: arr.reverse(),
    }
  }, 0)
}

const getNominals = async (nominals, amount) => {
  let result = {}
  let currentAmount = 0

  for (let [nominal, haveBanknotes] of nominals) {
    if (!haveBanknotes) continue
    await delay(DURATIONS[nominal])

    const needBanknotes = Math.floor(amount / nominal)

    if (haveBanknotes <= needBanknotes) {
      result[nominal] = haveBanknotes
      currentAmount += nominal * haveBanknotes
    } else if (needBanknotes) {
      result[nominal] = needBanknotes
      currentAmount += nominal * needBanknotes
    }
    if (amount - nominal * needBanknotes >= 0) {
      amount -= nominal * needBanknotes
    }
    console.log(nominal)
  }

  return { currentAmount, result }
}

const createATM = nominalsMap => {
  const { nominals, allSum } = parseNominalsMap(nominalsMap)

  let amounts = []
  let isBusy
  let sum = 0

  return async amount => {
    amounts.push(amount)
    if (isBusy) return

    isBusy = true

    for (let amount of amounts) {
      const { currentAmount, result } = await getNominals(nominals, amount)
      sum += currentAmount
      if (currentAmount < amount || allSum < sum) {
        throw new Error(ERROR_MESSAGE)
      }
      console.log('result', result)
      return result
    }
    isBusy = false
  }
}

const getMoney = createATM({ 5000: 1, 1000: 1, 100: 7 })

getMoney(6200)
getMoney(200)
getMoney(300)

module.exports = { createATM }
