import { createRouter, createWebHistory } from 'vue-router'
import AddContact from '../components/AddContact'
import Editcontact from '../components/Editcontact'
import ContactList from '../components/ContactList'

const routes = [
  {
    path: '/',
    name: 'ContactList',
    component: ContactList
  },
  {
    path: '/addcontact',
    name: 'Addcontact',
    component: AddContact
  },
  {
    path: '/contact/edit/:id?',
    name: 'Editcontact',
    component: Editcontact,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
