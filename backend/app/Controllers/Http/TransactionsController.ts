import Transaction from 'App/Models/Transaction'

export default class TransactionsController {

  public async index() {
    return Transaction.all()
  }

  public async store({ request }) {
    const data = request.only([
      'date',
      'description',
      'amount',
      'type'
    ])

    return Transaction.create(data)
  }

  public async update({ params, request }) {
    const trx = await Transaction.findOrFail(params.id)
    trx.merge(request.all())
    await trx.save()
    return trx
  }

  public async destroy({ params }) {
    const trx = await Transaction.findOrFail(params.id)
    await trx.delete()
    return { message: 'Deleted' }
  }

  public async summary() {
    const income = await Transaction.query()
      .where('type', 'IN')
      .sum('amount as total')

    const expense = await Transaction.query()
      .where('type', 'OUT')
      .sum('amount as total')

    const totalIn = Number(income[0].$extras.total || 0)
    const totalOut = Number(expense[0].$extras.total || 0)

    return {
      income: totalIn,
      expense: totalOut,
      balance: totalIn - totalOut
    }
  }
}
