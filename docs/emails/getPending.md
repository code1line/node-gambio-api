# Get all pending E-Mails

### Description

Returns all pending E-Mails.

### Method

```js
API.emails.getPending()
```

### Return value in resolved promise

```js
// Array.
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
