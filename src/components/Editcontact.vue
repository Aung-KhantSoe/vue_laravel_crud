<template>
  <div class="container">
    <div class="col-md-6">
      <div class="alert alert-danger mt-4" v-if="error.length">
        <ul>
          <li v-for="err in error" :key="err">{{ err }}</li>
        </ul>
      </div>
      <form @submit.prevent="updateContact">
        <fieldset>
          <div class="form-group">
            <label class="form-label mt-4">Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Name"
              v-model="name"
            />
          </div>
          <div class="form-group">
            <label class="form-label mt-4">Email</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label class="form-label mt-4">Designation</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Designation"
              v-model="designation"
            />
          </div>
          <div class="form-group">
            <label class="form-label mt-4">Contact Number</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Contact No"
              v-model="contact_no"
            />
          </div>
          <button class="btn btn-primary mt-4">Submit</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>
  
  <script>
import router from "@/router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    let name = ref("");
    let email = ref("");
    let designation = ref("");
    let contact_no = ref("");
    let contact = ref([]);
    let error = ref([]);
    let route = useRoute();

    let updateContact = async () => {
      error.value = [];
      if (!name.value) {
        error.value.push("Name is required");
      }
      if (!email.value) {
        error.value.push("Email is required");
      }
      if (!designation.value) {
        error.value.push("Designation is required");
      }
      if (!contact_no.value) {
        error.value.push("Contact number is required");
      }
      if (!error.value.length) {
        await fetch("http://127.0.0.1:8000/api/updateContact/"+route.params.id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            designation: designation.value,
            contact_no: contact_no.value,
          }),
        })
          .then((res) => {
            console.log(res);
            router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    let getContact = async (id)=>{
        await fetch("http://127.0.0.1:8000/api/getContact/"+id)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            if (data) {
                name.value = data.name;
                email.value = data.email;
                designation.value = data.designation;
                contact_no.value = data.contact_no;
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    onMounted(()=>{
        getContact(route.params.id);
    })

    return {
      name,
      email,
      designation,
      contact_no,
      updateContact,
      getContact,
      contact,
      error,
    };
  },
};
</script>
  
  <style>
</style>