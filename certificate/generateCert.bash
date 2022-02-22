#!/bin/bash

# $1 -> output Dir - for save all needed files -> default "certificate/CA"
# $2 -> extfile path - the configuration file -> default "certificate/openssl.cnf"

outputDir=$1
if [ "$1" == "" ] ; then
outputDir="certificate/CA"
echo ""
echo "WARNING: Variable \"output Dir\" was setted to \"$outputDir\". Verify if you are running from the correct path"
fi

extFilePath=$2
if [ "$2" == "" ] ; then
extFilePath="certificate/openssl.cnf"
echo ""
echo "WARNING: Variable \"extfile path\" was setted to \"$extFilePath\". Verify if you are running from the correct path"
fi

if [ ! -r "$extFilePath" ] ; then
echo ""
echo "ERROR: exiting - \"$extFilePath\" file not founded"
exit
fi

if [ "$( tail -n 1 $extFilePath )" == "[alt_names]" ] ; then
echo ""
echo "ERROR: exiting - file \"$extFilePath\" incomplete"
echo "Need add \"alt_names\"."
echo "Plese read the documentation first."
exit 
fi

echo ""
echo "Certificates will be generated in \"$outputDir\" path with configuration from \"$extFilePath\" file."

echo ""

mkdir "$outputDir"
openssl genrsa -out "$outputDir/CA.key" -des3 2048
openssl req -x509 -sha256 -new -nodes -days 3650 -key "$outputDir/CA.key" -out "$outputDir/CA.pem" -subj "/C=PT/O=Inovar Proxy/CN=Inovar Proxy"

mkdir "$outputDir/server"
openssl genrsa -out "$outputDir/server/server.key" -des3 2048
openssl req -new -key "$outputDir/server/server.key" -subj "/C=PT/O=Inovar Proxy/CN=Inovar Proxy" -out "$outputDir/server/server.csr"
openssl x509 -req -in "$outputDir/server/server.csr" -CA "$outputDir/CA.pem" -CAkey "$outputDir/CA.key" -CAcreateserial -days 3650 -sha256 -extfile "$extFilePath" -out "$outputDir/server/server.crt"
openssl rsa -in "$outputDir/server/server.key" -out "$outputDir/server/server.decrypted.key"

echo ""
