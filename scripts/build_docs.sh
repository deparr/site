#!/usr/bin/bash

typst --version 2>&1 > /dev/null
if [ ! $? ]; then
    echo "typst is not executable"
    echo "exiting"
    exit 1
fi

# documents and whether they need to be preprocessed
declare -A DOC_FILES=(
    ["resume"]="1"
)
PREPROCESS="./preprocess.sh"

cd docs

for doc in "${!DOC_FILES[@]}"; do 
    echo "building $doc..."
    procname="$doc.typ"
    if [[ "${DOC_FILES[$doc]}" ]]; then
        varfile="$doc-vars"
        procname="${doc}_out.typ"
        if [[ "${doc}_pre.typ" -nt "$procname" ]]; then
            $PREPROCESS "${doc}_pre.typ" "$procname" "$varfile" || printf "\tERROR: preprocessing $doc\n\tskipping\n" 
        fi
    fi

    outname="$doc.pdf"
    typst compile "$procname" "$outname" 2> /dev/null || printf "\tERROR: building $doc, check $procname\n\tskipping\n"
done; unset doc; unset procname; unset outname;

echo "done"

exit 0
