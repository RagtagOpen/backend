#!/usr/bin/python3.5
import os
import sys
import requests
import psycopg2


########################################################
# must pass db name as first argument
########################################################


key =  os.environ['MAILGUNKEY']
request_url = "https://api.mailgun.net/v3/{0}/messages".format(os.environ['MAILGUN_DOMAIN'])

try:
	conn = psycopg2.connect("dbname={0} user='carpool_app'".format(sys.argv[1]))
except:
	print ("I am unable to connect to the database")
	exit

cur = conn.cursor()
cur.execute("""SELECT value from carpoolvote.params where name='reports_mailing_list'""")

rows = cur.fetchall()

for row in rows:
	recipients = row[0].split(',')

	#print (recipients)
	body = "".join(sys.stdin)
	#print ('\n')
	#print (body)
	request = requests.post(request_url, auth=('api', key), data={
		'from': "Carpool Vote <{0}>".format(os.environ['FROM_EMAIL']),
		'to': recipients,
		'subject': "{0}".format(sys.argv[2]) ,
		'text': body
		})

	print ('Status: {0}'.format(request.status_code))
#	print ('Body:   {0}'.format(request.text))
cur.close()
conn.close()
