import firebase_admin
from firebase_admin import credentials, firestore
import time
import base64
import pyautogui


def fix_base64_padding(base64_string):
    # Calculate the length of padding needed
    padding_needed = 4 - len(base64_string) % 4
    
    # Add padding characters ('=')
    base64_string_padded = base64_string + '=' * padding_needed
    
    return base64_string_padded

def remove_image_prefix(base64_string):
    prefixes = ["data:image/png;base64,", "data:image/jpeg;base64,", "data:image/gif;base64,", "data:image/webp;base64,"]

    for prefix in prefixes:
        if base64_string.startswith(prefix):
            return base64_string[len(prefix):]

    # If no matching prefix found, return original string
    return base64_string

def save_base64_to_png(base64_string, output_file):
    # Remove the prefix
    base64_string = remove_image_prefix(base64_string)

    # Fix the padding
    base64_string = fix_base64_padding(base64_string)
    

    # Decode the base64 string
    image_data = base64.b64decode(base64_string)
    
    # Write the decoded data to a PNG file
    with open(output_file, 'wb') as file:
        file.write(image_data)

# ---------------------------------------------------------------


def mouse_sequence():
    pyautogui.moveTo(791, 570)
    time.sleep(0.1)
    pyautogui.click()
    time.sleep(0.1)
    pyautogui.moveTo(634, 288)
    time.sleep(0.1)
    pyautogui.click()
    time.sleep(0.1)
    pyautogui.moveTo(582, 328)
    time.sleep(0.1)
    pyautogui.click()
    time.sleep(0.1)
    pyautogui.moveTo(1318, 421)
    time.sleep(0.1)
    pyautogui.click()
    time.sleep(0.1)
    pyautogui.moveTo(791, 570)
     

# ---------------------------------------------------------------

# Use a service account
cred = credentials.Certificate('/Users/james/Downloads/firebase-admin.json')
firebase_admin.initialize_app(cred)

# Set up Firestore client
db = firestore.client()

# Define callback function for document changes
def on_snapshot(doc_snapshot, changes, read_time):
    for doc in doc_snapshot:
        if doc.exists:
            data = doc.to_dict()
            print(f"Current snapshot: {read_time}")
            
            base64 = data["base64"]
            save_base64_to_png(base64, 'output.png')
            mouse_sequence()

# Reference to the specific document
doc_ref = db.collection('images').document('image')

# Set up listener for document
doc_watch = doc_ref.on_snapshot(on_snapshot)



# ---------------------------------------------------------------





# Keep the script running
while True:
    time.sleep(1)
    
    # x, y = pyautogui.position()
    
    # # Print the coordinates
    # print(f"Mouse position - X: {x}, Y: {y}")