cat ~/.bash_aliases 
alias cls=clear
alias cp='cp -iv'                           # Preferred 'cp' implementation
alias mv='mv -iv'                           # Preferred 'mv' implementation
alias mkdir='mkdir -pv'                     # Preferred 'mkdir' implementation
alias ls='ls -GFh --color=auto'
alias ll='ls -Fla --color=auto'                          # Preferred 'ls' implementation
alias ngl='npm list -g --depth=0'
alias less='less -FSRXc'                    # Preferred 'less' implementation
alias cd..='cd ../'                         # Go back 1 directory level (for fast typers)
alias ..='cd ../'                           # Go back 1 directory level
alias ~="cd ~"                              # ~:            Go Home
alias qfind="find . -name "                 # qfind:    Quickly search for file
alias subl='open -a "Sublime Text"'
alias psgrep='ps aux | grep '
# folder aliases
alias dev='cd ~/dev'

alias tzc='cd ~/dev/recursivezero/tz-client'
alias tzs='cd ~/dev/recursivezero/tz-server'
alias tzsc='cd ~/dev/recursivezero/tz-script'
alias abcd='cd ~/dev/recursivezero/abcd'
alias rz='cd ~/dev/recursivezero'

alias nrd='npm run dev'
alias nrs='npm run start'
alias nrb='npm run build'
alias nr='npm run $@'

alias python='python3'