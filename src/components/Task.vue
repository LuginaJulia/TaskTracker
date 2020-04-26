<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="task.name"
          name="title"
        />
        <div
          v-if="submitted && errors.has('title')"
          class="alert-danger"
        >{{errors.first('title')}}</div>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="task.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="date">Deadline</label>
        <input 
          class="form-control"
          v-model="task.date"
          type="date" 
          id="date" 
          name="date"
        />
      </div>

      <div class="form-group">
        <div v-if="!task.file">
          <label for="image">Select an image</label>
          <input
            @change="onFileChange"
            type="file"
            class="form-control-file"
            id="image"
            required
            name="file"
            accept="image/*"
          />
        </div>
        <div v-else>
          <label for="selectedImage">Image</label>
          <img id="selectedImage" :src="task.file" />
          <button @click="removeImage">Remove image</button>
        </div>
      </div>
      <button v-if="!this.existing" @click="saveTask" class="btn btn-success">Create</button>
      <button v-else @click="updateTask" class="btn btn-success">Update</button>
    </div>
  </div>
</template>

<script>
import Task from "../models/task";

export default {
  name: "task",
  data: () => ({
    task: new Task({ id: null, name: '', description: '', file: '', date: null, status: false }),
    existing: false,
    submitted: false,
    successful: false,
    message: ''
  }),
  methods: {
    getTask(id) {
      this.$store.dispatch('task/find', id).then(
        () => {
          this.task = this.$store.state.task.task;
        },
        error => {
          this.message =
            (error.response && error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      )
    },

    saveTask() {
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('task/create', this.task).then(
            () => {
              this.$router.push('/tasks');
            },
            error => {
              this.message =
                (error.response && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          )
        }
      })
    },

    updateTask() {
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('task/update', this.task).then(
            () => {
              this.$router.push('/tasks');
            },
            error => {
              this.message =
                (error.response && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          )
        }
      })
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },

    createImage(file) {
      var reader = new FileReader();
      var vm = this.task;

      reader.onload = (e) => {
        console.log(e);
        vm.file = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    removeImage: function () {
      this.task.file = '';
    }
  },
  mounted() {
    if (this.$route.params.id != 'new') {
      this.getTask(this.$route.params.id);
      this.existing = true;
    }
  }
};
</script>

<style>
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
textarea:focus, input:focus{
    outline: none;
}
*:focus {
    outline: none;
}
img {
  width: 100%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>