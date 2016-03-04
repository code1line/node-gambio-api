# Get a specific E-Mail

### Description

Returns an E-Mail, selected by the E-Mail ID.

### Method

```js
API.emails.getById(id)
```

### Parameters

`id` - *Number* - E-Mail ID

### Example

```js
API.emails.getById(4);
```

### Return value in resolved promise

```js
// Object.
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
