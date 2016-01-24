# Get all sent E-Mails

### Description

Returns all sent E-Mails.

### Method

```js
API.emails.getSent()
```

### Example

```js
API.emails.getSent();
```

### Return value in resolved promise

```js
// Array.
[{
  id: 28,
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
}]
```
