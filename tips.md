# Useful Tips and Tools

## Bash Completion

A must have package to work faster

```bash
sudo apt update
apt info bash-completion
sudo apt install bash-completion
```

verify

```sh
cat /etc/profile.d/bash_completion.sh
```

## Video to GIF in Ubuntu

1. first create a palette image

```sh
ffmpeg -y -i input.mp4 -vf palettegen palette.png
```

2. now use this image while generating gif

```sh
ffmpeg -ss 5.0 -t 40 -i hc.mp4 -i palette.png -filter_complex "[0:v] fps=10,scale=320:-1 [new];[new][1:v] paletteuse" output.gif
# or
ffmpeg -y -ss 5.0 -t 40 -i hc.mp4 -i palette.png -aspect 16:9 -filter_complex paletteuse -r 10 animation.gif
```

-y => overwrite output file without asking
-ss => skip first 5 seconds
-t => duration for 40 seconds
-i => input ( write twice ; one for video and one for image pellete )
-r => set frame rate

other way; without image palette generation

```sh
ffmpeg -ss 1 -to 6 -i input.mp4 -filter_complex "fps=10,scale=1280:-1[s]; [s]split[a][b]; [a]palettegen[palette]; [b][palette]paletteuse" output.gif
```

## update node in ubuntu

```sh
# remove nodejs
sudo apt purge nodejs npm
# then install curl
sudo apt install curl
# install nvm: check for latest version [on nvm page](<https://github.com/nvm-sh/nvm>]
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# reload bash
source ~/.bashrc

# install nvm

nvm install node
```

it will download latest node js version

set latest as default

```sh
nvm alias default node
```

## File Manager

```sh
sudo apt install nautilus to see File Manager
```

## Cursor issue

if mouse cursor comes as white square in 24.04

then first check which mouse theme you are using; for that install gnome tweak and check under Appearance > Cursor

```sh
sudo apt install gnome-tweaks

cd /usr/share/icons
```

then cursor theme sub directory ( in my case cursor theme is DMZ-Black )

```sh
cd DMZ-Black/cursors

sudo ln -s left_ptr default
```

## install tree

```sh
sudo apt install tree
```

## install xclip to save output in clipboard

```sh
sudo apt-get install xclip

```

use rimraf to use rimraf ( delete node_modules usually )

```sh
sudo apt install node-rimraf

```

## List of all installed software

Show package installed using apt-get

```sh
tail -n
```

search pattern for specific package

```sh
sudo apt list --installed | grep rim
```

installed by *snap* ( default installer comes with ubuntu 24.04)

```sh
ls -l /var/lib/snapd/snaps

```
