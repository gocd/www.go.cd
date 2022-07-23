---
layout: post
title: Using GoCD with custom certificates
type: post
author: Sachin Sudheendra
excerpt: "This post will help you set up GoCD to use your custom TLS certificate instead of the self-signed certificate that GoCD ships with."
summary_image: "/assets/images/blog/using-go-cd-with-custom-certificates/summary_image.png"
title_tag_of_header: "Using GoCD with custom certificates | GoCD Blog"
meta_description: "GoCD is open source continuous delivery software. This post will help you set up GoCD to use your custom certificate instead of a self-signed certificate."
meta_keywords: "GoCD, continuous delivery, continuous delivery software, continuous integration, continuous integration software, go, goforcd, open source, custom certificate, self signed, certificate"
---

The following post will help you setting up [GoCD](https://www.gocd.org) to use your custom certificate instead of the self-signed certificate that GoCD ships with.

Note: This post is a copy of the one available [here](https://sachinsudheendra.github.io/2014/03/08/using-go-cd-with-custom-certificates.html)

> Assumption: You have the certificate key (\*.key) and an X509 certificate (\*.crt).

## Step 1: Changing passphrase of certificate key

The passphrase of the certificate key, for example **site.key**, should be changed to match the one we use for the keystore.

> Note: Certificate passphrase **must** be set to **serverKeystorepa55w0rd**

    $ mv site.key site.key.orig
    $ openssl rsa -des3 -in site.key.orig -out site.key
    Enter pass phrase for site.key.orig:
    writing RSA key
    Enter PEM pass phrase:
    Verifying - Enter PEM pass phrase:

## Step 2: Converting your certificate (site.crt) into PKCS12 format

If you have the key and certificate, you should export them to the pkcs12 format by running

    $ openssl pkcs12 -inkey site.key -in site.crt -export -out site.pkcs12
    Enter pass phrase for site.key:
    Enter Export Password:
    Verifying - Enter Export Password:

## Step 3: Importing the PKCS12 store into the Java Keystore

Once you have the site.pkcs12 file, you would need to import this keystore into the java keystore that GoCD uses. We will use the **keytool** utility that ships with Java.

> Note: Destination keystore password **must** be set to **serverKeystorepa55w0rd**

    $ keytool -importkeystore -srckeystore site.pkcs12 -srcstoretype PKCS12 -destkeystore keystore -srcalias 1 -destalias cruise
    Enter destination keystore password: serverKeystorepa55w0rd
    Re-enter new password: serverKeystorepa55w0rd
    Enter source keystore password:
    Entry for alias 1 successfully imported.
    Import command completed:  1 entries successfully imported, 0 entries failed or cancelled

## Step 4: Replacing the current GoCD keystore with the newly generated one

Now that the **keystore** (/tmp/keystore) is created, we'll replace the one that GoCD uses with this new one.

- Stop go-server

      sudo /etc/init.d/go-server stop

- Change user to **go**

      sudo su - go

- Change directory

      cd /etc/go

- Backup the current keystore

      mv keystore keystore.original

- Copy over the new keystore

      cp /tmp/keystore /etc/go

- Start go-server

      sudo /etc/init.d/go-server start

Post this, when you access the GoCD Server over HTTPS (https://<go-server>:8154), the certificate served should be the one you added into the keystore.


## References

- [#gocd](https://www.gocd.org)
- [Setting up self-signed SSL certificates for your Jetty instance (experiments with Noir and Clojure)](https://sharetheconversation.blogspot.in/2012/01/setting-up-self-signed-ssl-certificates.html)
