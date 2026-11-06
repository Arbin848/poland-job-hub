import zipfile
import os
import sys

base_dir = "/app/applet/public/evidence/stage3c"
zip_path = "/app/applet/public/PolJobHub_Stage3C_Multipage_A4_Acceptance.zip"

if os.path.exists(zip_path):
    os.remove(zip_path)

print(f"Creating ZIP from {base_dir} to {zip_path}...")
count = 0
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file == '.DS_Store':
                continue
            full_path = os.path.join(root, file)
            arcname = os.path.relpath(full_path, base_dir)
            z.write(full_path, arcname)
            count += 1

print(f"Added {count} files to zip.")

# Verify integrity
with zipfile.ZipFile(zip_path, 'r') as z:
    err = z.testzip()
    if err is not None:
        print(f"ERROR: Corrupt file in zip: {err}")
        sys.exit(1)
    print("Zip archive integrity check: OK")
