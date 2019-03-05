import feedparser
from datetime import datetime
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

def get_credentials():
  SCOPES = ['https://www.googleapis.com/auth/calendar']

  creds = None
  # The file token.pickle stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists('token.pickle'):
      with open('token.pickle', 'rb') as token:
          creds = pickle.load(token)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
      if creds and creds.expired and creds.refresh_token:
          creds.refresh(Request())
      else:
          flow = InstalledAppFlow.from_client_secrets_file(
              'credentials.json', SCOPES)
          creds = flow.run_local_server()
      # Save the credentials for the next run
      with open('token.pickle', 'wb') as token:
        pickle.dump(creds, token)

  return creds

def create_event(item):
  try:
    title = item.title.split('":')[0].replace("\"", "")
  except:
    title = ""

  try:
    location = item.title.split('":')[1]
  except:
    location = ""

  try:
    date = item.summary_detail.value.split('-- \n')[0].split(',')[0]
  except:
    date = ""

  try:
    time = item.summary_detail.value.split('-- \n')[0].split(',')[1]
  except:
    time = ""

  try:
    description = item.summary_detail.value.split('-- \n')[1]
  except:
    description = ""

  try:
    link = item.links[0]['href']
  except:
    link = ""

  event_object = {
    'summary': title,
    'location': location,
    'description': description,
    'start': {
      'dateTime': '2018-05-30T09:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': '2018-05-30T17:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'recurrence': [],
    'attendees': [],
    'reminders': {}
  }
  return event_object

if __name__ == "__main__":
  rss = feedparser.parse(r'https://annarborobserver.com/rss_calendar.xml')

  service = build('calendar', 'v3', credentials=get_credentials())

  for item in rss.entries:
    calendar_event = service.events().insert(calendarId='primary', body=create_event(item)).execute()
    print('Event created: %s' % (calendar_event.get('htmlLink')))
