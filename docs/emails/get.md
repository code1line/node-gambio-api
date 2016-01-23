### E-Mails - Get All

**Description**:
- Returns all E-Mails.
- Optionally you can request a sorted result by passing a `sorting` argument.
- If provided, `sorting` should be a hash with the field name as key and `asc` or `desc` as value.  

**Method**:
- `API.emails.get(sorting)`

**Parameters**:
- `sorting` *Object* - Sorting criteria (optional).

**Example**:
```js
const API = new GambioApi({ ... });

// Get all E-Mails.
API.emails.get()
  .then(console.log)
  .catch(console.error);

// With sorting criteria (sort by ID in descending order).
API.emails.get({ id : 'desc' })
  .then(console.log)
  .catch(console.error);

// With multiple sorting criteria (sort by ID in descending order and first name in ascending order).
API.emails.get({ id : 'desc', firstname: 'asc'})
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Array*
```js
// API.emails.get()
[{
  id: 14,
  subject: 'Ihre Bestellung 400310, am Donnerstag, 02. Juli 2015',
  sender: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  recipient: {
    emailAddress: 'testshop1@gambio.de',
    contactName: 'Testshop'
  },
  replyTo: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  contentHtml: '...',
  contentPlain: '...',
  isPending: false,
  creationDate: '2015-07-02 13:56:07',
  sentDate: '2015-07-02 13:56:08',
  bcc: [],
  cc: [],
  attachments: []
}]
```
