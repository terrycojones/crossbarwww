For production use, it is strongly recommended to run WebSocket *always* over TLS ("secure WebSocket"). 

This is for mainly two reasons:

* keeping your and your user's data confidential
* avoiding issues with WebSocket on networks that employ so-called intermediaries (proxies, caches, firewalls)

> The latter is especially important on locked down enterprise environments and on mobile operator networks. By using secure WebSocket ("wss"), WebSocket will work in almost all circumstances (exceptions potentially being TLS interception / MITM proxies).

**Crossbar**.io has full support for running secure WebSocket and HTTPS. This guide describes the 3 main options:

* Using self-signed certificates
* Using certificates from commercial CAs
* Creating and using your own CA

We also strongly recommend to test your server using the [SSL Server Test](https://www.ssllabs.com/ssltest/) provided by Qualys SSL Labs. This will point out any weaknesses of your configuration or issues with your certificate.

## Configuration

To configure a WebSocket transport for TLS, include a `tls` dictionary with (mandatory) attributes `key` and `certificate` in your transport configuration. Here is an example:

```javascript
{
   "type": "websocket",
   "endpoint": {
      "type": "tcp",
      "port": 443,
      "tls": {
         "key": "server_key.pem",
         "certificate": "server_cert.pem"
      }
   },
   "url": "wss://example.com"
}
```

The `key` must point to the server's private key file (PEM format, no passphrase), and the `certificate` must point to the server's certificate file (PEM format). The paths can be relative to the node directory, or absolute.

To configure a Web transport for TLS, here is an example:

```javascript
{
   "type": "web",
   "endpoint": {
      "type": "tcp",
      "port": 443,
      "tls": {
         "key": "server_key.pem",
         "certificate": "server_cert.pem"
      }
   },
   "paths": {
      "/": {
         "type": "static",
         "directory": ".."
      },
      "ws": {
         "type": "websocket",
         "url": "wss://example.com/ws"
      }
   }
}
```

## Options

The TLS configuration has a couple of options:

```javascript
{
   "type": "websocket",
   "endpoint": {
      "type": "tcp",
      "port": 443,
      "tls": {
         "key": "server_key.pem",
         "certificate": "server_cert.pem",
         "dhparam": "dhparam.pem",
         "ciphers": "ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:ECDH+3DES:DH+3DES:RSA+AES:RSA+3DES:!ADH:!AECDH:!MD5:!DSS"
      }
   },
   "url": "wss://example.com"
}
```
where
* `key` is the filesystem path to the server private key file (PEM format, no passphrase) (**mandatory**)
* `certificate` is the filesystem path to the server certificate file (PEM format) (**mandatory**)
* `dhparam` is the filesystem path to a Diffie-Hellman parameter file - see explanation below (**optional**)
* `ciphers` is a list of ciphers the server is willing to use with a client - see explanation below (**optional**)

### Diffie-Hellman

To use [Diffie-Hellman](http://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) based key exchange, you need to generate a parameter file:

```
openssl dhparam -2 1024 -out .crossbar/dhparam.pem
```

The use of Diffie-Hellman key exchange is desirable, since this provides [Perfect Forward Secrecy (PFS)](http://en.wikipedia.org/wiki/Forward_secrecy). Without a DH parameter file, no Diffie-Hellman based ciphers will be used, even if configured to do so.

### Elliptic Curve Ciphers

Using elliptic curve based ciphers ("ECDH/ECDHE") is generally considered desirable, since shorter keys than RSA support strong encryption already consuming less CPU cycles.

#### Prerequisites for EC Support

EC crypto is fully supported by **Crossbar**.io, if the underlying OpenSSL library supports EC **and** you have pyOpenSSL >= 0.15 running.

You can check like this:

```console
openssl ecparam -list_curves
```

To install pyOpenSSL trunk (since 0.15 isn't released yet - 2014/07/09):

```console
cd ~
git clone git@github.com:pyca/pyopenssl.git
cd pyopenssl
python setup.py install
```

**Crossbar**.io uses the `prime256v1` curve by default.

`prime256v1`(X9.62/SECG) is an elliptic curve over a 256 bit prime field. This is elliptic curve "NIST P-256" from [here](http://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-4.pdf).

This seems to be the most [widely used curve](http://crypto.stackexchange.com/questions/11310/with-openssl-and-ecdhe-how-to-show-the-actual-curve-being-used) and researchers [think](https://twitter.com/hyperelliptic/status/394258454342148096) it is "ok" (other than wrt timing attacks etc that might lurk inside OpenSSL itself).

### Ciphers

**Crossbar**.io will by default run a very strong and conservative set of ciphers:

```
ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:DHE-RSA-AES128-SHA
```

Above configuration activates exactly 6 ciphers to be used, all of which provide **Forward Secrecy**.

**Note that the default configuration does not support Windows XP!**. If you must support XP, you will need to modify the ciphers configuration.

In general, you should only change the `ciphers` if you know what you are doing.

The `ciphers` parameter must be in the format as used by OpenSSL, and the OpenSSL library version installed on the system must support the ciphers configured to make same actually available. If your OpenSSL version installed does not support a configured cipher (e.g. ECDH elliptic curve based), the ciphers not available will simply be skipped.

## Using Self-signed Certificates

For production use, the use of self-signed certificates is *not recommended*. However, for testing, development, Intranet or controlled deployments, you can of course.

The following provides a recipe for creating a new server key and self-signed certificate for use with **Crossbar**.io.

First, check your OpenSSL version:

```
C:\Users\oberstet>openssl version
OpenSSL 1.0.1f 6 Jan 2014
```

> If running on Windows, make sure you start the command shell "as administrator". It seems OpenSSL requires this at least during key generation.

Then, create a new server key (RSA with 2048 bits in this case):

```
openssl genrsa -out .crossbar/server_key.pem 2048
chmod 600 .crossbar/server_key.pem
```

> A server key must not be protected with a passphrase, since it needs to be loaded unattended. However, you should make sure that file permissions are set so that only the user under which the server starts is able to read the key.

Next, create a new certificate signing request ("CSR") for the key generated formerly:

```
openssl req -new -key .crossbar/server_key.pem -out .crossbar/server_csr.pem
```

You must set the "Common Name" (CN) to the fully qualified domain name (or IP address) of the server, e.g. `server23.tavendo.com` (or `62.146.25.40`). Do NOT include a port number - a certificate is always for a server, not a service running on a specific port.

> Note: to view the contents of a CSR: `openssl req -text -noout -verify -in .crossbar/server_csr.pem`

Finally, create a new self-signed certificate (valid for 1 year) from the CSR created formerly:

```
openssl x509 -req -days 365 -in .crossbar/server_csr.pem -signkey .crossbar/server_key.pem -out .crossbar/server_cert.pem
```
> Note: to view the contents of a certificate: `openssl x509 -text -noout -in .crossbar/server_cert.pem`


## Using commercial certificates

For production use, you will usually deploy certificates issues by commercial CAs, since only for those, browsers will have the CA certificates preinstalled, and hence users won't be bothered with invalid certificate dialogs.

> If you are looking for a free certificate, we recommend [StartSSL](http://www.startssl.com/).

Remove the passphrase protection from the private key with the OpenSSL (should there be any):

```
openssl rsa -in server_key_with_passphrase.pem -out server_key.pem
```

> Note: This is needed since we want the server to start automatically without administrator interaction.

Append any intermediate CA certificates to the server certificate:

```
cat ../sub.class1.server.sha2.ca.pem >> server_cert.pem
```

> The certificates must be in PEM format and must be sorted starting with the subject's certificate (actual client or server certificate), followed by *intermediate* CA certificates if applicable, but *excluding* the
> highest level (root) CA.

Upload the key and certificate to your server host:

```
scp server_cert.pem server_key.pem serveruser@server.example.com:/home/serveruser
```

Login to the server and make sure you restrict the key's file permissions

```
cd /home/serveruser
chmod 600 server_key.pem
chmod 644 server_cert.pem
```

> This step is extremely important, especially since we removed the passphrase from the private key! The certificate file is non-critical.

Move the files to your **Crossbar**.io node directory:

```
mv server_key.pem server_cert.pem .crossbar
```

## Creating your own Certificate Authority

The following recipe is for creating your own root certificate authority ("CA"), and certify your server certificates with your own CA to create server certificates.

First, create a new private key for your CA:

```
openssl genrsa -aes256 -out ca_key.pem 4096
chmod 600 ca_key.pem
```

> As "Common Name" (CN), you could choose something like "Tavendo Certificate Authority". This is different from servers, where CN should be the FQDN, and personal certificates, where the CN should be the Email of the person.

Next, create a certificate for your CA valid for 10 years:

```
openssl req -new -x509 -days 3650 -extensions v3_ca -key ca_key.pem -out ca_cert.pem
```

To check and view your CA certificate:

```
openssl x509 -in ca_cert.pem -noout -text
```

Create a server certificate signed by your CA:

```
openssl x509 -req -days 365 -CA ca_cert.pem -CAkey ca_key.pem -CAcreateserial \
   -addreject emailProtection -addreject clientAuth -addtrust serverAuth \
   -in .crossbar/server_csr.pem -out .crossbar/server_cert.pem
```

View the server certificate:

```
openssl x509 -text -noout -in .crossbar/server_cert.pem
```

### CA Certificate Import

Browser will by default not accept your server certificate, since your CA certificate is not preinstalled in their trust store.

The following describes how to import your CA certificate into browsers. After doing so, browsers will silently accept any server certificate you issue with your CA.

On Microsoft Windows, both Internet Explorer and Google Chrome use the Windows OS-wide certificate store. Mozilla Firefox uses an own certificate store unrelated to the Windows OS-wide certificate store.

To import your CA certificate on Windows for browsers using the Windows certificate store, rename the CA certificate file to `*.crt` and double click it:

![](/static/img/docs/shots/windows_cert_import1.png)

start the import wizard:

![](/static/img/docs/shots/windows_cert_import2.png)

make sure you manually **select the "Trusted Root Certificate" store (!)**:

![](/static/img/docs/shots/windows_cert_import3.png)

.. continue ..

![](/static/img/docs/shots/windows_cert_import4.png)

verify the CA certificate fingerprint:

![](/static/img/docs/shots/windows_cert_import5.png)


## Testing

You can use `openssl client` command to check your server in the end:

```console
oberstet@corei7ub1310:~/scm/3rdparty/openssl$ ~/openssl/bin/openssl s_client -brief -connect demo.crossbar.io:443
depth=1 C = IL, O = StartCom Ltd., OU = Secure Digital Certificate Signing, CN = StartCom Class 1 Primary Intermediate Server CA
verify error:num=20:unable to get local issuer certificate
CONNECTION ESTABLISHED
Protocol version: TLSv1.2
Ciphersuite: ECDHE-RSA-AES128-GCM-SHA256
Peer certificate: description = 3FfmiF3b24n8r1Hz, C = DE, CN = demo.crossbar.io, emailAddress = postmaster@crossbar.io
Hash used: SHA384
Supported Elliptic Curve Point Formats: uncompressed:ansiX962_compressed_prime:ansiX962_compressed_char2
Server Temp Key: ECDH, P-256, 256 bits
...
```

## Useful Resources

 * [OpenSSL man page](http://linux.die.net/man/1/dhparam)
 * [OpenSSL API documentation](http://linux.die.net/man/3/ssl_ctx_set_tmp_dh)
 * [The Most Common OpenSSL Commands](https://www.sslshopper.com/article-most-common-openssl-commands.html)
