# parse_git_branch() {
#    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
# }

# new method
parse_git_branch () {

    while read -r branch; do
        [[ $branch = \** ]] && current_branch=${branch#* }
    done < <(git branch 2>/dev/null)

    [[ $current_branch ]] && printf ' [%s]' "$current_branch"

}

pman() {
    man -t "${1}" | open -f -a /Applications/Preview.app
}

chrome () {
    open -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "$1"
}
