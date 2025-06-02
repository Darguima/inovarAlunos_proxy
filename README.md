<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/darguima/inovarAlunos_proxy">
    <img src="./readme/logo.svg" alt="Inovar Proxy thumbnail" width="350px">
  </a>

  <h3 align="center">Inovar Proxy</h3>

  <p align="center">
    Intercepts and modifies `Inovar Alunos` servers response 
    <br />
    <br />
    <a href="#-demo">View Demo</a>
    &middot;
    <a href="#-getting-started">Getting Started</a>
  </p>

<h4 align="center">
⭐ Don't forget to Starring ⭐
</h4>

  <div align="center">

[![TypeScript][TypeScript-badge]][TypeScript-url]

  </div>

</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>📋 Table of Contents</summary>

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Glossary](#-glossary)
- [Getting Started](#-getting-started)
- [Scripts](#%EF%B8%8F-scripts)
- [Contributing](#-contributing)
- [Disclaimer](#️-disclaimer)
- [Developed by](#-developed-by)
</details>



## 🔍 About The Project

`Inovar Proxy` is a __Proof of Concept__ of intercepting and handling the response of `Inovar Alunos` API servers.

### 🎯 The goal

[Inovar Alunos](https://inovar-mais.com/inovar-alunos/) is a management application for schools, for organizing summaries and student's absences and occurrences in some schools in Portugal.

The idea of this Proxy is to intercept the communication from the API and change its response.

### ⚙️ How it works?

For this we need to do DNS Poising on the network/device and run a local server with the proxy. Due to browser security precautions we also need to generate an SSL Certificate and install it. 

### 🎬 Demo

https://user-images.githubusercontent.com/49988070/155302136-5ba88290-41f0-4fa4-8f15-0027ff44c90e.mp4



## 📚 Glossary

Due to the abstraction of this POC some variables are used in this documentation. So here's what they are: 

1. __Inovar Server Domain__ - The domain from your public Inovar Server - ex.: inovar.aecarlosoafonso.pt
2. __Local Server IP__ - The IP from your Proxy Server in your network. If you are using a Raspberry Pi this is its IP - ex.: 192.168.1.30
3. __Root Directory Path__ - The root path of the cloned repository. Run `pwd` to get the full path - ex.: /home/pi/inovarAlunos_proxy



## 🚀 Getting Started

To get a local copy up and running follow these simple example steps.

Take into account that since it's necessary to create a proxy, most part of the commands below are for Linux.

### 1. Prerequisites

- Server on your home network (Raspberry Pi or old computer running Linux)
* [Git](https://git-scm.com/downloads) - Version Control System
- [Node.js](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- DNS Server (ex.: [`dnsmasq`](https://thekelleys.org.uk/dnsmasq/doc.html)) or write permissions on `hosts` file
- some tech/network knowledge is useful


###### `Inovar Proxy` works as a DNS spoofing attack, so you need change the DNS server IP in the router (for all network), or edit the Internet Connection Settings in device.

### 2. Cloning

Now clone the repository to the machine. You can do this using Git:

```bash
$ git clone git@github.com:darguima/inovarAlunos_proxy.git
# or
$ git clone https://github.com/darguima/inovarAlunos_proxy.git
```

### 3. Generating SSL Certificates 📜

Before start generating the certificate please read first the [documentation](#certificategeneratecertbash) about this script and configure it for Android or for Firefox.

To create the SSL Certificate, run in the project root directory and edit what is necessary:

```bash
$ echo "DNS.1 = {Inovar Server Domain}" >> certificate/openssl.cnf
$ nano certificate/openssl.cnf
$ certificate/generateCert.bash certificate/CA certificate/openssl.cnf
```

This commands will create the `certificate/CA` path with the required certificates. Node.js is already configured to get them in this directory. Otherwise, if you choose another output dir, change it in `src/index.ts`

Commands based on [this](https://www.section.io/engineering-education/how-to-get-ssl-https-for-localhost/) tutorial.

### 4. Change what you want 👨‍💻

Before star the proxy, you need configure what you want to manipulate on the server response.

At this point it will delete all your absences and occurrences. If you want to change something go to `src/index.ts` and change the code in the lines below: 

```javascript
case `/api/faltas/${registrationId}/1`:
```

### 5. Run the server 🚀

Now we have everything set up to start the server. First install all dependencies, build the project and finally run it:

```bash
$ yarn
$ yarn build
$ yarn start
```

If `Server Started` appears in your terminal, everything worked fine.

If you want to close a SSH session without close the server you can add a `&` to run the command in background:

```bash
$ yarn start &
```

If you want the server to start up automatically on the Raspberry boot you can add to `/etc/rc.local` this line.

```bash
cd {Root Directory Path}; node dist/index.js
```

### 6. Redirecting the browser ↪️

In order for the site to be accessible from {Inovar Server Domain} you will need to trick your computer to the wrong IP when it try to connect the real Inovar Server.

In both cases you need access to the computer/router to this have effect on the device/network.

##### DNS Server 🌐

To the proxy be accessible in whole network you can configure your router to use another DNS Server. For this start by running one (this can be done in the same device that runs the proxy).

###### dnsmasq

The most easy DNS Server for this propose is [dnsmasq](https://thekelleys.org.uk/dnsmasq/doc.html).

Find out how install it in your server. For Raspberry Pi:

```bash
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install dnsmasq
```

Configure it adding the following lines to `/etc/dnsmasq.conf`: (don't forget to write the Raspberry Pi IP)

```
listen-address=127.0.0.1
listen-address={Local Server IP}
cache-size=10000

server=8.8.8.8
server=8.8.4.4

domain-needed
bogus-priv
expand-hosts

# if instead of /etc/hosts you want use other file configure it the 2 lines below
# no-hosts
# addn-hosts=/etc/fakeHosts
```

dnsmasq reads `/etc/hosts` to know which domains to redirected and where. For that read [this](#etchosts---linux-).

And finally just start and enable the server:

```bash
$ sudo service dnsmasq start
```

After this 2 commands every time you boot your Raspberry the server will already be on.

Now in order to use the new DNS Server you need login in your router settings and search for the `DNS Page` and use the {Local Server IP} instead of the default IP. If you don't know how do this try read [this](https://www.lifewire.com/how-to-change-dns-servers-on-most-popular-routers-2617995).

If your router don't have this option, or you don't have access to it you can configure the DNS locally in the computer/phone.

For [Windows, Mac and Linux](https://geekflare.com/change-dns-server/).
For [Android](https://devilbox.readthedocs.io/en/latest/howto/dns/add-custom-dns-server-on-android.html).

##### `/etc/hosts` - Linux 💻

If you don't want/can create a DNS Server you can edit your Linux file `/etc/hosts` that will have the same effect on the local machine.
If you are configuring the `dnsmasq` you also need to this configuration on the server.

Open the file and add the line or run this commands:

```bash
$ echo "{Local Server IP}	{Inovar Server Domain}" | sudo tee -a /etc/hosts  > /dev/null
$ cat /etc/hosts
```

The last command will print the file. Verify if it printed your line.

If you were using `dnsmasq` go [back](#dnsmasq) and finish the configuration. 

### 7. Add the certificate to the Browser

When trying to connect to the server in your browser, you will see a warning message due to security risks. You can ignore this warning or to never see it again you can import the certificate into your browser. Search on the internet how to do this in your browser. 

Try this on [Chrome](https://support.securly.com/hc/en-us/articles/206081828-How-do-I-manually-install-the-Securly-SSL-certificate-in-Chrome).

###### Firefox Example

`Settings` > `Privacy & Security` > `Certificates` > `View Certificates ...` > `Import` > and select `certificate/CA/CA.pem`

### 8. Final 🎆

If everything went well when you try to connect to `Server Inovar` now, the connection is going through your proxy and the response is being modified. 

### Limitations

Bearing in mind that this project is a POC and that I am yet trying to fix some problems, there may still be some limitations such as: 

- You can only create a certificate for Android or Firefox. You can't create for both at the same time (I haven't tried it in other environments). However, you can still ignore the browser warning and access the website.



## ⚙️ Scripts

### certificate/generateCert.bash

Bash script to generate the CA certificate, the server certificate and the private key.

```bash
$ certificate/generateCert.bash {?output Dir} {?extfile path}
```

1. __output Dir__ - optional - the path where all certificates and keys will be generated -> default "certificate/CA"

2. __extfile path__ - optional - the configuration file path -> default "certificate/openssl.cnf"

###### Note: Is needed to run in project root directory when omitting parameters.

##### extfile

Is in this file where all the server certificate configurations are saved. You don't need understand all them but you need to add at least one more line and edit other.

Start by adding the line and next open the file with your preferred editor (nano for this example):

```bash
$ echo "DNS.1 = {Inovar Server Domain}" >> certificate/openssl.cnf
$ nano certificate/openssl.cnf
```

This line added is required to the certificate knows where it will be used

Now focus on `basicConstraints` line.

###### Firefox

In order for the proxy to be accessible from Firefox, you need to set `CA:FALSE`.

###### Android

In order for the proxy to be accessible from your phone, you need to set `CA:TRUE`.

###### Others

I just performed tests in these two environments. If you are using IOS or Chrome for example, try the 2 options and feel free to add your contribution. For more read [Limitations](#limitations)





## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## ⚠️ Disclaimer

This is a study project. If you are running this in your house your are not doing nothing illegal, but if you don't know how networks work may you can cause some damage/misconfiguration on your LAN.

Also remember that you cannot change the DNS server of a device/router if it is not yours or if you do not have permission to do so.



## 👨‍💻 Developed by

- [Darguima](https://github.com/darguima)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[project-thumbnail]: ./readme/logo.svg

[TypeScript-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org
