const fs = require("fs/promises");
const contacts = require("./db/contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);

    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);

    case "add":
      const updatedContacts = await contacts.addContact(name, email, phone);
      return console.log(updatedContacts);

    case "remove":
      const formattedContacts = await contacts.removeContact(id);
      return console.log(formattedContacts);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
