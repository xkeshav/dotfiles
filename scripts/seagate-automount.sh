#!/bin/bash

# Auto-mount script for Seagate Backup Plus Drive
# This script automatically mounts the Seagate drive when connected

LOG_FILE="/var/log/seagate-automount.log"
MOUNT_POINT="/mnt/backup-drive"
DEVICE="/dev/sda1"
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

# Check if the device exists
if [ ! -b "$DEVICE" ]; then
    log_message "ERROR: Device $DEVICE not found"
    exit 1
fi

# Create mount point if it doesn't exist
if [ ! -d "$MOUNT_POINT" ]; then
    mkdir -p "$MOUNT_POINT"
    log_message "Created mount point: $MOUNT_POINT"
fi

# Check if already mounted
if mountpoint -q "$MOUNT_POINT"; then
    log_message "Device already mounted at $MOUNT_POINT"
    notify_user "Seagate drive already mounted"
    exit 0
fi

# Mount the device
if mount -t ntfs-3g "$DEVICE" "$MOUNT_POINT" -o uid=1000,gid=1000,umask=022,locale=en_US.utf8; then
    log_message "SUCCESS: Mounted $DEVICE to $MOUNT_POINT"
    notify_user "Seagate drive mounted successfully at $MOUNT_POINT"
    
    # Set proper permissions for user access
    chown -R "$USER_TO_NOTIFY:$USER_TO_NOTIFY" "$MOUNT_POINT" 2>/dev/null || true
    
    log_message "Mount completed successfully"
else
    log_message "ERROR: Failed to mount $DEVICE to $MOUNT_POINT"
    notify_user "Failed to mount Seagate drive"
    exit 1
fi
