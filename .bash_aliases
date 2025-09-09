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

export work='/xtra/work'

alias tzf='cd $work/recursivezero/tz-fabric'
alias tzc='cd /xtra/work/recursivezero/tz-client'
alias tzs='cd /xtra/work/recursivezero/tz-server'
alias tzp='cd /xtra/work/recursivezero/tz-script'
alias abcd='cd /xtra/work/recursivezero/abcd'
alias rz='cd /xtra/work/recursivezero'
alias xk='cd /xtra/work/xkeshav'
alias mmt='cd /xtra/work/maturity-matrix'

alias nrd='npm run dev'
alias nrs='npm run start'
alias nrb='npm run build'
alias lint='npm run lint'
alias nr='npm run $@'
alias ni='npm install $@'
alias nu='npm uninstall $@'

alias python='python3'
