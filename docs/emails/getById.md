### E-Mails - Get

**Description**:
- Returns an E-Mail, selected by the E-Mail ID.

**Method**:
- `API.emails.getById(id)`

**Parameters**:
- `id` *Integer* - E-Mail ID.

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.getById(4)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  id: 4,
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
  isPending: false,
  creationDate: '2015-07-02 14:00:07',
  sentDate: '2015-07-02 14:10:38',
  bcc: [],
  cc: [],
  attachments: []
}

```
