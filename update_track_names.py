import os
from glob import glob
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, TIT2

def clean_filename(filename):
    # Remove extension and path
    name = os.path.splitext(os.path.basename(filename))[0]
    # Replace dashes with spaces and clean up multiple spaces
    name = name.replace('-', ' ').strip()
    return ' '.join(name.split())

def update_track_name(file_path):
    try:
        # Get clean name from filename
        clean_name = clean_filename(file_path)
        
        # Load or create ID3 tags
        try:
            audio = MP3(file_path, ID3=ID3)
        except:  # noqa: E722
            print(f"Creating new ID3 tag for {file_path}")
            audio = MP3(file_path)
            audio.add_tags()
        
        # Update title
        audio.tags.add(TIT2(encoding=3, text=clean_name))
        audio.save()
        return True, None
        
    except Exception as e:
        return False, str(e)

def main():
    # Find all MP3 files in current directory
    mp3_files = glob("*.mp3")
    total_files = len(mp3_files)
    
    if total_files == 0:
        print("No MP3 files found in current directory")
        return
    
    print(f"Found {total_files} MP3 files")
    success_count = 0
    
    for index, file_path in enumerate(mp3_files, 1):
        print(f"\nProcessing {index}/{total_files}: {file_path}")
        success, error = update_track_name(file_path)
        
        if success:
            print(f"Updated title to: {clean_filename(file_path)}")
            success_count += 1
        else:
            print(f"Error processing {file_path}: {error}")
    
    print(f"\nComplete! Successfully updated {success_count} of {total_files} files")

if __name__ == "__main__":
    main()

