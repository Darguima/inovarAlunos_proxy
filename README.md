# Inovar Proxy

`Inovar Proxy` is a __Proof of Concept__ of intercepting and altering the response of the `Inovar Alunos` API servers.

### Glossary

Due to the abstraction of this POC some variables are used in this documentation. So here's what they are: 

1. __Inovar Server Domain__ - The domain from your public Inovar Server - ex.: inovar.aecarlosoafonso.pt
2. __Local Server IP__ - The IP from your Proxy Server in your network - ex.: 192.168.1.30

## Installation

### Generating SSL Certificates

To create the SSL Certificate run in the project root directory:

```console
$ echo "DNS.1 = {Inovar Server Domain}" >> certificate/openssl.cnf
$ certificate/generateCert.bash certificate/CA certificate/openssl.cnf
```

Command based on [this](https://www.section.io/engineering-education/how-to-get-ssl-https-for-localhost/) tutorial.

### Change what you want

When you start the proxy it will intercept your student account. At this moment it will erase all you faults. If you want change something go to `src/index.ts` and change the code on lines after 

```javascript
case `/api/faltas/${registrationId}/1`:
```

### Run the server

```console
$ yarn
$ yarn build
$ yarn start
```

### DNS Server or `/etc/hosts`

For the site be accessible from {Inovar Server Domain} you will need to trick your computer to the wrong IP when it try to connect the real Inovar Server.

In both cases you need access to the computer/router to this have effect on the device/network

###### DNS Server

You can install and configure a DNS server if you know how.

###### `/etc/hosts` - Linux

You can add a line to your hosts files

```console
$ su
$ echo "{Local Server IP}	{Inovar Server Domain}" >> /etc/hosts
```

### Add the certificate to the Browser


When trying to connect to the server in your browser, you will see a warning message due to security risks. You can ignore this warning or to never see it again you can import the certificate into your browser. Search on the internet how to do this in your browser. 

###### Firefox Example

`Settings` > `Privacy & Security` > `Certificates` > `View Certificates ...` > `Import` > and select `certificate/CA/CA.pem`

## Scripts

### certificate/generateCert.bash

Bash script to generate the CA certificate, the server certificate and the private key.

```console
$ certificate/generateCert.bash {?output Dir} {?extfile path}
```

1. __output Dir__ - optional - the path where all certificates and keys will be generated -> default "certificate/CA"

2. __extfile path__ - optional - the configuration file path -> default "certificate/openssl.cnf"

* Is needed to run in project root directory when omitting parameters.

##### extfile

Is in this file where all the server certificate configurations are saved. You don't need understand them but you need to add at least one more line in this file.

```console
$ echo "DNS.1 = {Inovar Server Domain}" >> certificate/openssl.cnf
```

This line is required to the certificate knows where it will be used
