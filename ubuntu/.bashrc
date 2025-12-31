# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth
export PROMPT_DIRTRIM=2
# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
# force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

RED='\[\033[01;31m\]'
GREEN='\[\033[01;32m\]'
YELLOW='\[\033[01;33m\]'
BLUE='\[\033[01;34m\]'
MAGENTA='\[\033[01;35m\]'
CYAN='\[\033[01;36m\]'
GRAY='\[\033[01;37m\]'

LIGHT_RED='\[\033[00;31m\]'
LIGHT_GREEN='\[\033[00;32m\]'
LIGHT_YELLOW='\[\033[00;33m\]'
LIGHT_BLUE='\[\033[00;34m\]'
LIGHT_CYAN='\[\033[00;36m\]'
LIGHT_GRAY='\[\033[01;37m\]'

WHITE='\[\033[00m\]'
COLOR_NONE='\[\e[00m\]'


parse_git_branch () {
   while read -r branch; do
        [[ $branch = \** ]] && current_branch=${branch#* }
   done < <(git branch 2>/dev/null)
   [[ $current_branch ]] && printf '(%s) ' "$current_branch"
}


if [ "$color_prompt" = yes ]; then
#PS1='${debian_chroot:+($debian_chroot)}\[\033[00m\]\t \[\033[01;37m\]\u@\[\033[01;36m\]\h\[\033[01;33m\]:\[\033[00;32m\]\w\[\033[01;31m\] $(parse_git_branch)\[\033[00m\]\$ '
PS1="${debian_chroot:+($debian_chroot)} ${LIGHT_GREEN}\t ${YELLOW}\u${WHITE}@${CYAN}\h${GREEN}:${BLUE}\w${MAGENTA} \$(parse_git_branch)${WHITE}\$ "
else
PS1="${debian_chroot:+($debian_chroot)} \t \u@\h:\w \$(parse_git_branch)\$ "
fi
PS1="$PS1${COLOR_NONE}"

unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
#export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

NPM_PACKAGES="${HOME}/.npm-packages"
export PATH="$PATH:$NPM_PACKAGES/bin"

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).

if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

# ensure git completion is loaded so __git_complete exists
if [ -f /usr/share/bash-completion/completions/git ]; then
  . /usr/share/bash-completion/completions/git
fi

if [ -f ~/.bash_aliases ]; then
   . ~/.bash_aliases
fi


export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


# Load Angular CLI autocompletion.
source <(ng completion script)
export PATH=$HOME/.local/bin:$PATH


. "/home/recursive/.deno/env" source /etc/profile.d/bash_completion.sh

# pnpm
export PNPM_HOME="/home/recursive/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
export PATH="$HOME/.local/bin:$PATH"
export PATH="/opt/Citrix/ICAClient:$PATH"
alias wfica="LC_ALL=C /opt/Citrix/ICAClient/wfica"
alias citrix="LC_ALL=C /opt/Citrix/ICAClient/wfica"
alias citrix-shell="LC_ALL=C /opt/Citrix/ICAClient/wfica.sh"

# Seagate drive aliases
alias mount-seagate="sudo /usr/local/bin/seagate-automount.sh"
alias unmount-seagate="sudo /usr/local/bin/seagate-unmount.sh"
alias seagate-log="tail -f /var/log/seagate-automount.log"

# Python virtual environment settings
export WORKON_HOME="/xtra/venvs"
export VIRTUALENVWRAPPER_PYTHON="/usr/bin/python3"
export PIP_REQUIRE_VIRTUALENV=true

# Helper function to create venv in /xtra/venvs
mkvenv() {
    if [ -z "$1" ]; then
        echo "Usage: mkvenv <venv_name>"
        return 1
    fi
    python3 -m venv "/xtra/venvs/$1"
    echo "Virtual environment '$1' created in /xtra/venvs/$1"
    echo "Activate with: source /xtra/venvs/$1/bin/activate"
}

# Prevent creating __pycache__ in current directory
export PYTHONDONTWRITEBYTECODE=1

. "$HOME/.cargo/env"
