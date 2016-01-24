# Send an E-Mail

### Description

Sends a new or existing E-Mail.

Providing `id` only will send an existing one.

Skipping `id` with `null` or `undefined` while passing in `data` will create and send a new E-Mail.

### Method
```js
API.emails.send(id, data)
```

### Parameters

`id` - *integer* - E-Mail ID **(optional)**

`data` - *object* - E-Mail data **(optional)**

### Example

```js
// E-Mail data.
const data = {
  subject: 'Test Subject',
  sender: {
    emailAddress: 'sender@email.de',
    contactName: 'John Doe',
  },
  recipient: {
    emailAddress: 'recipient@email.de',
    contactName: 'Jane Doe',
  },
  replyTo: {
    emailAddress: 'reply_to@email.de',
    contactName: 'John Doe (Reply To)',
  },
  contentHtml: '<strong>HTML Content</content>',
  contentPlain: 'Plain Content',
  bcc: [
    {
      emailAddress: 'bcc@email.de',
      contactName: 'Chris Doe',
    },
  ],
  cc: [
    {
      emailAddress: 'cc@email.de',
      contactName: 'Chloe Doe',
    },
  ],
};

// Send queued E-Mail by ID.
API.emails.send(17);

// Send new E-Mail.
API.emails.send(null, data);
```

### Return value in resolved promise

```js
// Object.
{
  id: 17,
  subject: 'Eine kurze Test-Mail',
  sender: {
    emailAddress: 'sender@email.de',
    contactName: 'John Doe'
  },
  recipient: {
    emailAddress: 'recipient@email.de',
    contactName: 'Jane Doe'
  },
  replyTo: null,
  contentHtml: null,
  contentPlain: 'Its me, John!',
  isPending: false,
  creationDate: '2016-01-19 20:10:08',
  sentDate: '2016-01-19 20:11:11',
  bcc: [],
  cc: [],
  attachments: []
}

```
