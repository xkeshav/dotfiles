INPUT_FILE=$1
OUTPUT_FILE="${1%%.*}"
FPS=15
WIDTH=512
# ffmpeg -i $INPUT_FILE -vf fps=$FPS,scale=$WIDTH:-1:flags=lanczos,palettegen $TEMP_FILE_PATHi
ffmpeg -i $INPUT_FILE -i $INPUT_FILE -loop 0 -ss 00:00:02 -delay 5 $OUTPUT_FILE.gif
