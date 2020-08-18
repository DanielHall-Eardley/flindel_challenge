const db = require('../database/db.js')

//date-fns adds convenience methods for date calculations
const {add, isBefore, parseISO} = require('date-fns')

// Use this function to get Current Date
function getCurrentDate() {
  return "2020-06-20T12:27:40+04:00"
}

/*For each product in a transaction, check if it can be
returned based the company's return policy and 
individual product details. Calculate the total
refund based on product price and qauntity*/
const checkProductReturn = async (req, res, next) => {
  try {
    const transaction = db.findTransaction(req.body.id)

    if (!transaction) {
      throw new Error ('No transaction found')
    }
 
    const productReturnArray = []
    let refundTotal = 0

    /*Cache the companies to avoid making extra database
    calls when multiple products share a common company*/
    const cacheCompanies = {}

    for (let product of transaction.prods) {
      //check the cache
      let company;
      if (!cacheCompanies[product.companyId]) {
        company = db.findCompany(product.companyId)
        cacheCompanies[product.companyId] = company
      } else {
        company = cacheCompanies[product.companyId]
      }

      /*Calculate the date that products can be returned
      before, based on company return policy*/
      const timeLimit = add(
        parseISO(transaction.transaction_date), 
        {days: company.returnPolicy.timeLimit}
      )
      
      const now = parseISO(getCurrentDate())
      const checkDate = isBefore(now, timeLimit)

      if (checkDate && product.returnable && !product.onsale) {
        productReturnArray.push(product)
        refundTotal += product.price * product.quantity
      }
    }

    if (productReturnArray.length < 1) {
      throw new Error('No products from this transaction can be returned')
    }
    
    res.status(200).json({
      products: productReturnArray,
      refund: refundTotal
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkProductReturn
}