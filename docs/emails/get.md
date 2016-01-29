# Get all E-Mails

### Description

Returns all E-Mails.

Optionally you can request a sorted and minimized result by passing `sorting` and `limitedFields` arguments.

If provided, `sorting` must be an object containing the field name as key and `asc` or `desc` as value.

If provided, `limitedFields` must be an array of strings containing the field names you want to request.

### Method

```js
API.emails.get(sorting)
```

### Parameters

`sorting` - *object* - Sorting criteria **(optional)**.

`limitedFields` - *array* - Field names to be returned **(optional)**.

### Example

```js
// Get all E-Mails.
API.emails.get();

// With sorting criteria.
API.emails.get({ id : 'desc', subject: 'asc' });

// With multiple sorting criteria and minimized result (only the subject).
API.emails.get({ id : 'desc', subject: 'asc'}, ['subject']);
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
