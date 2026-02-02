import Route from '@ioc:Adonis/Core/Route'

Route.get('/transactions', 'TransactionsController.index')
Route.post('/transactions', 'TransactionsController.store')
Route.put('/transactions/:id', 'TransactionsController.update')
Route.delete('/transactions/:id', 'TransactionsController.destroy')

Route.get('/summary', 'TransactionsController.summary')
