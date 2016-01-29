# Get all pending E-Mails

### Description

Returns all pending E-Mails.

Optionally you can request a sorted and minimized result by passing `sorting` and `limitedFields` arguments.

If provided, `sorting` must be an object containing the field name as key and `asc` or `desc` as value.

If provided, `limitedFields` must be an array of strings containing the field names you want to request.

### Method

```js
API.emails.getPending()
```

### Parameters

`sorting` - *object* - Sorting criteria **(optional)**.

`limitedFields` - *array* - Field names to be returned **(optional)**.

### Example

```js
API.emails.getPending();

// With sorting criteria.
API.emails.getPending({ id : 'desc', subject: 'asc' });

// With multiple sorting criteria and minimized result (only the subject).
API.emails.getPending({ id : 'desc', subject: 'asc'}, ['subject']);
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
