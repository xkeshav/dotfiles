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
# git alias
alias gp='git pull'
alias gst='git status'

# folder aliases

export work='/xtra/work'  # use as cd $work
export rz='/xtra/work/recursivezero'
export xk='/xtra/work/xkeshav'

alias work='cd /xtra/work'
alias tzf='cd $rz/tz-fabric'
alias tzc='cd $rz/tz-client'
alias tzs='cd $rz/tz-server'
alias tzp='cd $rz/tz-script'
alias abcd='cd $rz/abcd'
alias rz='cd /xtra/work/recursivezero'
alias xk='cd /xtra/work/xkeshav'
alias mmt='cd $work/maturity-matrix'

alias nrd='npm run dev'
alias nrs='npm run start'
alias nrb='npm run build'
alias nrp='npm run preview'
alias lint='npm run lint'
alias nr='npm run $@'
alias ni='npm install $@'
alias nu='npm uninstall $@'
# poetry specific
alias prd='poetry run dev'
alias prz='poetry run threadzip dev'


alias python='python3'
alias check="shopt -q login_shell && echo 'Login shell' || echo 'Not a login shell'"

# switch branch name
gsh() {
    if [ -z "$1" ]; then
        git branch
    elif [ "$1" = "-c" ]; then
	git switch -c "$2"
    else
        git switch "$1"
    fi
}

__git_complete gsh _git_switch
