<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Designation</th>
          <th scope="col">Contact No</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="table-secondary"
          v-for="contact in contacts"
          :key="contact.id"
        >
          <th scope="row">{{ contact.id }}</th>
          <th scope="row">{{ contact.name }}</th>
          <th scope="row">{{ contact.email }}</th>
          <th scope="row">{{ contact.designation }}</th>
          <th scope="row">{{ contact.contact_no }}</th>
          <th scope="row"><router-link class="btn btn-primary btn-sm" :to="{name:'Editcontact',params:{id:contact.id}}">Edit</router-link>
          <button class="btn btn-danger btn-sm" @click="deleteContact(contact.id)">Delete</button></th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    let contacts = ref([]);
    let load = async () => {
      try {
        let response = await fetch("http://127.0.0.1:8000/api/contacts");
        if (response) {
          let datas = await response.json();
          contacts.value = datas.contacts;
        }
      } catch (err) {
        console.log(err);
      }
    };
    let deleteContact = async(id)=>{
        let api = "http://127.0.0.1:8000/api/deleteContact";
        await fetch(api+'/'+id,{
            method:"delete",

        })
        .then((response)=>{
            console.log(response);
            contacts.value = contacts.value.filter(item => {
                return item.id != id;
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onMounted(() => {
      load();
      console.log(contacts.value);
    });
    return { contacts, load,deleteContact };
  },
};
</script>

<style>
</style>