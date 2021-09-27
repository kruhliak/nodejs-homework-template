const fs = require("fs/promises");
const path = require("path");

const contacts = require("./contacts.json");

const contactsPath = path.join(__dirname, "contacts.json");

const { nanoid } = require("nanoid");

const listContacts = async () => contacts;

const getContactById = async (contactId) => {
  console.log(contactId);

  const contacts = await listContacts();
  console.log(contacts);
  const contact = contacts.find((contact) => contact.id === contactId);
  console.log(contact);
  if (!contact) {
    return null;
  }

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.findIndex((contact) => contact.id === contactId);
  if (contact === -1) {
    return null;
  }
  contacts.splice(contact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const generateId = nanoid();
  const { name, email, phone } = body;
  const newContact = { id: generateId, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (item) => item.id.toString() === contactId.toString()
  );
  if (idx === -1) {
    return null;
  }
  const updateContact = { ...contacts[idx], ...body };
  console.log(body);
  console.log(updateContact);
  contacts[idx] = updateContact;
  console.log(contacts[idx]);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
