### E-Mails - Get All Pending

**Description**:
- Returns all pending E-Mails.

**Method**:
- `API.emails.getPending()`

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.getPending()
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Array*
```js
[{
  id: 18,
  subject: 'Test-Mail',
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
  isPending: true,
  creationDate: '2015-07-02 14:00:07',
  bcc: [],
  cc: [],
  attachments: []
}]
```
