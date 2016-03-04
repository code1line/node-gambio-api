# Get all E-Mails

### Description

Returns all E-Mails.

### Method

```js
API.emails.get(sorting)
```

### Return value in resolved promise

```js
// Array.
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
