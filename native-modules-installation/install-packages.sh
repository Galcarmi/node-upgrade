#!/bin/bash

packages_to_run=(
    "bufferutil@4.0.1"
)


packages_that_works_node_18=(
    "bcrypt@5.1.0" "bcrypt@5.0.0"
    "bufferutil@4.0.7" "bufferutil@4.0.1" 
    "grpc@1.24.2" "grpc@1.24.11" 
    "iconv@3.0.1" "iconv@3.0.0"
    "keccak@3.0.3" "keccak@3.0.1" "keccak@2.1.0"

    "node-expat@2.4.0" "node-expat@2.3.18"
    "secp256k1@4.0.3" "secp256k1@4.0.2" "secp256k1@3.8.0" 
    "sqlite3@5.1.4" "sqlite3@5.0.0" 
    "tsparticles@1.43.1" "tsparticles@1.18.12" 
    "utf-8-validate@6.0.2" "utf-8-validate@5.0.10"
    "websocket@1.0.34" "websocket@1.0.31"


    "re2@1.17.7"
    "fmerge@1.2.0"
    "@web3-js/websocket@1.0.30" 
    "fibers@5.0.3" 
    "pprof@1.1.0" 
    "sse4_crc32@6.0.1" 
    "tiny-secp256k1@1.1.6" 
    "native-hello-world@2.0.0" 
    "cryptian@0.0.7" 
    "canvas@2.11.0" 
    "tulind@0.8.18" 
    "puppeteer@19.2.0" 
    "argon2@0.23.0" 
    "odbc@2.4.8"
    "libpq@1.8.12"
)

packages_fails_node_18=(
    "odbc@1.2.1" # odbc@2.4.8
    "fsevents@2.3.2" "fsevents@2.1.3" "fsevents@2.0.7" "fsevents@1.2.13"
    "buffertools@2.1.6"
    "contextify@0.1.15"
    "bcrypt@3.0.8" "bcrypt@3.0.6" #bcrypt@5.1.0
)



puppeteer_packages=(
    "puppeteer@1.17.0" "puppeteer@1.20.0" "puppeteer@2.0.0" "puppeteer@2.1.1" "puppeteer@3.0.0" "puppeteer@3.0.2" "puppeteer@3.3.0" "puppeteer@4.0.1"
    "puppeteer@5.5.0" "puppeteer@7.1.0" "puppeteer@8.0.0" "puppeteer@10.4.0" "puppeteer@13.1.1" "puppeteer@13.7.0" "puppeteer@14.4.1" "puppeteer@15.5.0"
)


log_file="failed_installs.log"
echo "" >> "$log_file"
(mkdir "output")
echo "Starting npm installations..."

for package in "${packages_to_run[@]}"; do
    package_name=$(echo "$package" | cut -d "@" -f 1)
    package_version=$(echo "$package" | cut -d "@" -f 2)
    
    echo "Installing $package_name@$package_version"
    (npm install "$package" 2>&1) || echo "\"$package_name@$package_version\"" >> "$log_file"
done

echo "Completed npm installations."

if [ -f "$log_file" ]; then
    echo -e "\nFailed installations:"
    cat "$log_file"
    echo "Failed installations have been logged in '$log_file'."
else
    echo "All installations were successful."
fi
