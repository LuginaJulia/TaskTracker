<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div v-if="warning.isPresent" class="alert alert-danger" role="alert">
        {{ warning.message }}
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="task.name"
          name="title"
        />
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

    <div v-else>
      <h4>Task's been created successfully!</h4>
      <button class="btn btn-success" @click="newTask">New Task</button>
    </div>
  </div>
</template>

<script>
import TaskDataService from "../services/TaskDataService";
import moment from 'moment';
export default {
  name: "add-task",
  data: () => ({
    task: {
      id: null,
      name: '',
      description: '',
      file: '',
      date: '',
      status: false
    },
    existing: false,
    submitted: false,
    warning: { isPresent: false, message: '' }
  }),
  methods: {
    getTask(id) {
      TaskDataService.get(id)
        .then(response => {
          this.existing = true;
          this.task = response.data;
          this.task.date = moment(response.data.date).format('YYYY-MM-DD');
          this.task.file = response.data.file;
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveTask() {
      var data = {
        name: this.task.title,
        description: this.task.description,
        file: this.task.file,
        date: this.task.date
      };
      TaskDataService.create(data)
        .then(response => {
          this.task.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.warning.isPresent = false;
        })
        .catch(e => {
          this.warning.isPresent = true;
          if ((JSON.parse(JSON.stringify(e)).message == 'Request failed with status code 400')) {
            this.warning.message = "Title can't be empty";
          } else {
            if ((JSON.parse(JSON.stringify(e)).message == 'Request failed with status code 500')) {
              this.warning.message = "Task can't be saved";
            }
          }
          console.log(e);
        });
    },
    updateTask() {
      var data = {
        name: this.task.title,
        description: this.task.description,
        file: this.task.file,
        date: this.task.date
      };
      TaskDataService.update(this.task.id, data)
        .then(response => {
          this.task.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.warning.isPresent = false;
        })
        .catch(e => {
          this.warning.isPresent = true;
          if ((JSON.parse(JSON.stringify(e)).message == 'Request failed with status code 400')) {
            this.warning.message = "Title can't be empty";
          } else {
            if ((JSON.parse(JSON.stringify(e)).message == 'Request failed with status code 500')) {
              this.warning.message = "Task can't be saved";
            }
          }
          console.log(e);
        });
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
    },

    newTask() {
      this.submitted = false;
      this.task = {};
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getTask(this.$route.params.id);
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
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