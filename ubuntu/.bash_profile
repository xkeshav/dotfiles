export PATH="$PATH:/opt/mongodb/bin"  # to run mongod from terminal
if [ -f ~/.bashrc ]; then 
  . ~/.bashrc; 
fi

if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi

RED="\[\033[0;31m\]"
YELLOW="\[\033[1;33m\]"
GREEN="\[\033[0;32m\]"
BLUE="\[\033[1;34m\]"
LIGHT_RED="\[\033[1;31m\]"
LIGHT_GREEN="\[\033[1;32m\]"
WHITE="\[\033[1;37m\]"
LIGHT_GRAY="\[\033[0;37m\]"
COLOR_NONE="\[\e[0m\]"

export PS1="${GREEN}\u@${YELLOW}\h:${LIGHT_RED}\w${WHITE}\$(parse_git_branch)${WHITE} $ "

export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad

## aliases

alias cp='cp -iv'                           # Preferred 'cp' implementation
alias mv='mv -iv'                           # Preferred 'mv' implementation
alias mkdir='mkdir -pv'                     # Preferred 'mkdir' implementation
alias ls='ls -GFh'
alias ll='ls -Fla'                          # Preferred 'ls' implementation
alias less='less -FSRXc'                    # Preferred 'less' implementation
# cd() { builtin cd "$@"; ll; }             # Always list directory contents upon 'cd'
alias cd..='cd ../'                         # Go back 1 directory level (for fast typers)
alias ..='cd ../'                           # Go back 1 directory level
alias f='open -a Finder ./'                 # f:            Opens current directory in MacOS Finder
alias ~="cd ~"                              # ~:            Go Home
alias qfind="find . -name "                 # qfind:    Quickly search for file
alias subl='open -a "Sublime Text"'
alias psgrep='ps aux | grep '

figlet keshav
