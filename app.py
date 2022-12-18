import ssl
from Plogging import socketio
from Plogging import app

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
ssl_context.load_cert_chain(certfile='server.crt', keyfile='server.key', password='DELETED')
socketio.run(app, host='0.0.0.0', port=3000, ssl_context=ssl_context)
# http => https : intro.js, connection.js

# socketio.run(app, debug=True)