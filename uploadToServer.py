import os
from ftplib import FTP
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# FTP server details
FTP_SERVER = os.getenv("FTP_SERVER")
FTP_USERNAME = os.getenv("FTP_USERNAME")
FTP_PASSWORD = os.getenv("FTP_PASSWORD")
LOCAL_FOLDER = os.getenv("LOCAL_FOLDER")
REMOTE_FOLDER = os.getenv("REMOTE_FOLDER")

def upload_file(ftp, file, remote_path):
    with open(file, 'rb') as f:
        ftp.storbinary(f'STOR {remote_path}', f)

def upload_folder(ftp, local_folder, remote_folder):
    for root, dirs, files in os.walk(local_folder):
        for dirname in dirs:
            local_path = os.path.join(root, dirname)
            relative_path = os.path.relpath(local_path, local_folder)
            remote_path = os.path.join(remote_folder, relative_path).replace("\\", "/")
            try:
                ftp.mkd(remote_path)
            except Exception as e:
                print(f"Directory {remote_path} already exists or cannot be created: {e}")

        for filename in files:
            local_path = os.path.join(root, filename)
            relative_path = os.path.relpath(local_path, local_folder)
            remote_path = os.path.join(remote_folder, relative_path).replace("\\", "/")
            upload_file(ftp, local_path, remote_path)

def main():
    ftp = FTP(FTP_SERVER)
    ftp.login(FTP_USERNAME, FTP_PASSWORD)
    upload_folder(ftp, LOCAL_FOLDER, REMOTE_FOLDER)
    ftp.quit()

if __name__ == "__main__":
    main()