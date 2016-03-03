# Queue an E-Mail

### Description

Queues a new E-Mail, so that it can be sent later.

### Method

```js
API.emails.queue(data)
```

### Parameters

`data` - *Object* - E-Mail data

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

// Queue E-Mail.
API.emails.queue(data);
```

### Returns in resolved promise

```js
// Object.
{
  id: 16,
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
  isPending: true,
  creationDate: '2016-01-19 20:10:08',
  sentDate: null,
  bcc: [],
  cc: [],
  attachments: []
}

```
