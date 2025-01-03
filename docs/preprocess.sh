#!/usr/bin/env bash

if [[ ! -e "$1" ]]; then
    exit 1
fi

# must declare a `VAR_MAP` dictionary
source $3

output=$(cat "$1")
for var in "${!VAR_MAP[@]}"; do
    echo $var
    output=$(printf "%s" "$output" | sed "s|$var|${VAR_MAP[$var]}|g")
done

printf "%s" "$output" > "$2"
