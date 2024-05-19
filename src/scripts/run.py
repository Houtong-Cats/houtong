import firebase_admin
from firebase_admin import credentials, firestore

# Use a service account
cred = credentials.Certificate('path/to/serviceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def on_snapshot(col_snapshot, changes, read_time):
    print(f'Current snapshot: {read_time}')
    for change in changes:
        if change.type.name == 'ADDED':
            print(f'New document: {change.document.id}')
        elif change.type.name == 'MODIFIED':
            print(f'Modified document: {change.document.id}')
        elif change.type.name == 'REMOVED':
            print(f'Removed document: {change.document.id}')


collection_ref = db.collection('your-collection-name')
query_watch = collection_ref.on_snapshot(on_snapshot)

import time
while True:
    time.sleep(1)
