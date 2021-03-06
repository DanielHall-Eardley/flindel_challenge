## Overview

Currently this app allow user to enter a transaction id, but will not do anything.

**Task**: You need to display all the products in the transaction that are eligible for return.

Product are eligible to return if

- purchased for less than 30 days
- not on sale when purchased
- is a returnable product

### Important notes

- Explain your assumptions, decisions, code in detail to help us better understand your code
- You can add npm if you want, but please explain why
- You can use the `db` interface which provide the functions (`findTransaction(id)` and `findProduct(id)`) to access the dummy database for this excerise.
- To get the date for "today", use `getCurrentDate()` in `App.js`
- Explain why if you modify any existing code, e.g. `db` functions, the database...etc
- It is important to think about scalability, e.g. how to make your code easy to maintain and add new feature?

Absolutely feel free to make the app better, although it is not neccessary to do more than the task, doing so can help us see your skill with more confidence! The following are a few suggestions but don't let that stop your imagination :)

- Better UI
- Better hierarchy and code design
- Add new/extend features, e.g. what if different company have different policy?

## Run app for testing

1. Start backend by `npm install` and `npm start`
2. Start frontend by go to `client` then `npm install` and `npm start`
3. Go to your browser and type `localhost:3000`, now you can test your work under this domain


## Gameplan 

1. Create an api for displaying all returnable items in a transaction
2. Create a 'company' db model that can hold that company's specific return policy
3. Create a UI for entering the transaction id and showing returnable products
4. Modularize and organize code components

## Database modifications

I added a companies collection so that a company can have a unique return policy. I also
changed the company field in the products collection to companyId so that specific company can be queried. 

I added a price field to the products collection so that a total refund amount can be
calculated. I also added a product name for UI purposes.

I emmbedded a product summary for each unique product in the transaction document. 
I did this for two reasons, firstly; I want to avoid having to query each product 
in the transaction to get the its information (it would be time consuming computation
in a real database). Secondly, I think it is useful to have a record of the product
at the time the transaction took place, that way if a product is deleted or modified 
in the future, information that is relevant to the transaction can still be accessed. 
I also added a quantity field the product summary to account for duplicate products within the same transaction.



