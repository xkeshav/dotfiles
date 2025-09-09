# Things to do after fresh Ubuntu 23.10.1

This new Ubuntu have more GUI and right click menu which gives experience of same as windows/mac.

Home icon on bottom right is similar to My Computer

other partition also displayed on dash  you can uncheck if not want to 

This is right click menu , similar to windows.

the little App Launcher on the end of Dash have all recent apps and settings just like Finder in Mac 

on top there is power button and other settings which can be open using `Super + s` keyboard 

so first check the settings from app Launcher and do some tweaks such as

- move dash to right 
- add seconds in time display

2. search for do top 10 things to do after install from OMG ubuntu page and [debugpoint](https://www.debugpoint.com/things-to-do-ubuntu-23-10/)

install few additional tools

```sh
  > sudo apt update && sudo apt upgrade
  > sudo apt install ubuntu-restricted-extras
  > sudo apt install gnome-shell-extension-ubuntu-tiling-assistant
  > sudo add-apt-repository universe
  > sudo apt install fonts-roboto fonts-cascadia-code fonts-firacode
  > sudo apt install dconf-cli dconf-editor
  > sudo apt install gnome-tweaks

```

> install few apps from app store

> Gnome Calendar

> Extension Manager 

click on Apps > software updater and update the software for once


---

remove key ring options using [this article](https://linuxconfig.org/how-to-disable-keyring-popup-on-ubuntu)


Then install few packages

1. VS code
 download .deb package and install using
 
 ```sh
 > sudo gpkg -i <absolute/path/to/package.deb>
 ```
 
 2. install Node js
 
 ```sh
 > sudo apt install nodejs
 > sudo apt install npm
 ```
 
 verify with
 
 > node -v 
 
 3. install GIT
 
 ```sh
 > sudo apt install git-all
```

Few points

default notepad support markdown; you need to change document type

make terminal and vs code "pin to dash" means it will be on program panel 

screenshot auto saved in picture/screenshot folder

More feature to explore

install Grub customizer

```sh
sudo add-apt-repository ppa:danielrichter2007/grub-customizer
sudo apt-get update
sudo apt-get install grub-customizer
```

install vim

> sudo apt-get install vim

here are few reference

> https://www.omgubuntu.co.uk/2023/10/ubuntu-23-10-new-features-download-link

## add git branch name in terminal

add below in `~/.bashrc` file

```sh
parse_git_branch() {
 git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

if [ "$color_prompt" = yes ]; then
 PS1='${debian_chroot:+($debian_chroot)}\[\033[00;37m\]\u@\h\[\033[01;32m\]:\[\033[01;34m\]\w\[\033[01;31m\] $(parse_git_branch)\[\033[00m\]\$ '
else
 PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w$(parse_git_branch)\$ '
fi

```

> sudo apt install gdebi


install using .deb file

>sudo apt install ./<package-name>.deb

dont forget to add `./` even you are in same location where package is downloaded


