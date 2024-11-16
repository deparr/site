#!/usr/bin/bash
source $3

if [[ ! -e "$1" ]]; then
    exit 1
fi

output=$(cat "$1")
for var in "${!VAR_MAP[@]}"; do
    output=$(printf "%s" "$output" | sed "s|$var|${VAR_MAP[$var]}|g")
done

printf "%s" "$output" > "$2"
