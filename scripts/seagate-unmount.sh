#!/bin/bash

# Unmount script for Seagate Backup Plus Drive
# This script safely unmounts the Seagate drive

LOG_FILE="/var/log/seagate-automount.log"
MOUNT_POINT="/mnt/backup-drive"
USER_TO_NOTIFY="recursive"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Function to send notification to user
notify_user() {
    if [ -n "$DISPLAY" ] && command -v notify-send >/dev/null 2>&1; then
        sudo -u "$USER_TO_NOTIFY" DISPLAY="$DISPLAY" notify-send "Seagate Drive" "$1" 2>/dev/null
    fi
}

# Check if mounted
if ! mountpoint -q "$MOUNT_POINT"; then
    log_message "Device not mounted at $MOUNT_POINT"
    notify_user "Seagate drive is not mounted"
    exit 0
fi

# Unmount the device
if umount "$MOUNT_POINT"; then
    log_message "SUCCESS: Unmounted $MOUNT_POINT"
    notify_user "Seagate drive safely unmounted - you can now remove it"
    sync  # Ensure all data is written
else
    log_message "ERROR: Failed to unmount $MOUNT_POINT"
    notify_user "Failed to unmount Seagate drive - check if files are in use"
    exit 1
fi
