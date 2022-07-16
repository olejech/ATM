const DURATIONS = { 5000: 500, 1000: 400, 500: 300, 100: 200, 50: 100 }
const delay = ms => new Promise(r => setTimeout(r, ms))

const createATM = nominalsMap => {
  const nominals = Object.entries(nominalsMap).reverse()

  return async amount => {
    const result = {}
    let currentSum = 0
    let currentAmount = amount

    for (let [nominal, haveBanknotes] of nominals) {
      if (!haveBanknotes) continue
      await delay(DURATIONS[nominal])

      const needBanknotes = Math.floor(currentAmount / nominal)

      if (haveBanknotes <= needBanknotes) {
        result[nominal] = haveBanknotes
        currentSum += nominal * haveBanknotes
      } else if (needBanknotes) {
        result[nominal] = needBanknotes
        currentSum += nominal * needBanknotes
      }
      if (currentAmount - nominal * needBanknotes >= 0) {
        currentAmount -= nominal * needBanknotes
      }

      console.log(nominal)
    }

    if (currentSum < amount) return null

    return result
  }
}

const getMoney = createATM({ 5000: 0, 1000: 7, 100: 5 })

getMoney(6200)
  .then(result => console.log(result))
  .then(() => getMoney(300)
  .then(result => console.log(result)))

module.exports = { createATM }
