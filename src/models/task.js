import moment from 'moment';

export default class Task {
  constructor({ id: id, name: name, description: description, file: file, date: date, status: status }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.file = file;
    this.date = moment(date).format('YYYY-MM-DD');
    this.status = status;
  }
}
