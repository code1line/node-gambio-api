import nock from 'nock';

const RESPONSE_DELAY = 500;
const RESPONSE_TIMES = 15;
const URL = 'http://myshop.com';
const AUTH = { user: 'user', pass: 'pass' };

const server = nock(URL);

// Route: Root URL.
server
  .get('/')
  .times(RESPONSE_TIMES)
  .delay(RESPONSE_DELAY)
  .reply(200, {})

  .post('/')
  .times(RESPONSE_TIMES)
  .delay(RESPONSE_DELAY)
  .reply(200, {})

  .delete('/')
  .times(RESPONSE_TIMES)
  .delay(RESPONSE_DELAY)
  .reply(200, {})

  .put('/')
  .times(RESPONSE_TIMES)
  .delay(RESPONSE_DELAY)
  .reply(200, {});

// Route: Not found URL.
server
  .get('/notfound')
  .times(RESPONSE_TIMES)
  .delay(RESPONSE_DELAY)
  .reply(404, { message: 'Not found' })

  .post('/notfound')
  .times(RESPONSE_TIMES)
  .delay(RESPONSE_DELAY)
  .reply(404, { message: 'Not found' })

  .delete('/notfound')
  .times(RESPONSE_TIMES)
  .delay(RESPONSE_DELAY)
  .reply(404, { message: 'Not found' })

  .put('/notfound')
  .times(RESPONSE_TIMES)
  .delay(RESPONSE_DELAY)
  .reply(404, { message: 'Not found' });

// Route: Internal server error.
server
  .get('/servererror')
  .times(RESPONSE_TIMES)
  .delay(RESPONSE_DELAY)
  .reply(500, { message: 'Internal server error' });

// Route: Basic authentication secured URL.
server
  .get('/secured')
  .basicAuth(AUTH)
  .times(RESPONSE_TIMES)
  .delay(RESPONSE_DELAY)
  .reply(200, {});

// Cleans the HTTP interceptor list.
function destroy() {
  nock.cleanAll();
}

export { URL, AUTH, server, destroy };
