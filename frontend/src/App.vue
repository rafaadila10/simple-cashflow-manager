<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const transactions = ref([])
const summary = ref({ income: 0, expense: 0, balance: 0 })

const form = ref({
  id: null,
  date: '',
  description: '',
  amount: '',
  type: 'IN'
})

const isEdit = ref(false)

// helper format rupiah
const formatRupiah = (num) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(num)
}

const fetchData = async () => {
  const res = await axios.get('http://localhost:3333/transactions')
  transactions.value = res.data

  const sum = await axios.get('http://localhost:3333/summary')
  summary.value = sum.data
}

const submit = async () => {
  if (isEdit.value) {
    await axios.put(
      `http://localhost:3333/transactions/${form.value.id}`,
      form.value
    )
  } else {
    await axios.post('http://localhost:3333/transactions', form.value)
  }

  resetForm()
  fetchData()
}

const editData = (trx) => {
  form.value = { ...trx }
  isEdit.value = true
}

const deleteData = async (id) => {
  if (confirm('Yakin mau hapus transaksi ini?')) {
    await axios.delete(`http://localhost:3333/transactions/${id}`)
    fetchData()
  }
}

const resetForm = () => {
  form.value = {
    id: null,
    date: '',
    description: '',
    amount: '',
    type: 'IN'
  }
  isEdit.value = false
}

const formatDateTime = (isoString) => {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}


onMounted(fetchData)
</script>

<template>
  <div class="container">
    <h1>💰 Simple Cashflow Manager</h1>

    <!-- SUMMARY -->
    <div class="cards">
      <div class="card income">
        <p>Income</p>
        <h2>{{ formatRupiah(summary.income) }}</h2>
      </div>
      <div class="card expense">
        <p>Expense</p>
        <h2>{{ formatRupiah(summary.expense) }}</h2>
      </div>
      <div class="card balance">
        <p>Balance</p>
        <h2>{{ formatRupiah(summary.balance) }}</h2>
      </div>
    </div>

    <!-- FORM -->
    <div class="form-card">
      <h3>{{ isEdit ? '✏️ Edit' : '➕ Add' }} Transaction</h3>
      <div class="form">
        <input v-model="form.date" type="date" />
        <input v-model="form.description" placeholder="Description" />
        <input v-model="form.amount" type="number" placeholder="Amount" />
        <select v-model="form.type">
          <option value="IN">IN (Income)</option>
          <option value="OUT">OUT (Expense)</option>
        </select>
      </div>

      <button class="btn primary" @click="submit">
        {{ isEdit ? 'Update' : 'Save' }}
      </button>
      <button v-if="isEdit" class="btn secondary" @click="resetForm">
        Cancel
      </button>
    </div>

    <!-- TABLE -->
    <div class="table-card">
      <h3>Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in transactions" :key="t.id">
            <td>{{ formatDateTime(t.date) }}</td>
            <td>{{ t.description }}</td>
            <td>
              <span :class="t.type === 'IN' ? 'tag in' : 'tag out'">
                {{ t.type }}
              </span>
            </td>
            <td>{{ formatRupiah(t.amount) }}</td>
            <td>
              <button class="btn small" @click="editData(t)">Edit</button>
              <button class="btn small danger" @click="deleteData(t.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  background: #f5f7fa;
}

.container {
  max-width: 900px;
  margin: 40px auto;
}

h1 {
  margin-bottom: 20px;
}

.cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.income { background: #2ecc71; }
.expense { background: #e74c3c; }
.balance { background: #3498db; }

.form-card, .table-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.form {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}

input, select {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.tag {
  padding: 4px 8px;
  border-radius: 6px;
  color: white;
  font-size: 12px;
}

.tag.in { background: #2ecc71; }
.tag.out { background: #e74c3c; }

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn.primary { background: #3498db; color: white; }
.btn.secondary { background: #95a5a6; color: white; }
.btn.small { margin-right: 5px; }
.btn.danger { background: #e74c3c; color: white; }
</style>
