from flask import Flask, request, json, redirect
import requests 
from firebase_admin import credentials, initialize_app, db
#import firebase_admin
from flask_cors import CORS


import firebase_admin


app=Flask(__name__)
CORS(app)  


config={
 "apiKey": "AIzaSyAlvdI-IVSjy23UfSpKKKw3zhhAnG-lGME",
  "authDomain": "twitter-clone-6e006.firebaseapp.com",
  "projectId": "twitter-clone-6e006",
  "databaseURL":"https://twitter-clone-6e006-default-rtdb.firebaseio.com/",
  "storageBucket": "twitter-clone-6e006.appspot.com",
  "messagingSenderId": "1047545271812",
  "appId": "1:1047545271812:web:c22fe42f90f9fa4de90751",
  'measurementId': "G-9CDNS69HPN"
}
#initializing firebase



cred = credentials.Certificate("twitter-clone.json")
firebase_admin.initialize_app(cred,{'databaseURL': config['databaseURL'],'projectId': config['projectId']
    
})


root_ref = db.reference('/')



@app.route("/signup", methods=['GET','POST'])

def signup():

    data=request.json

    print(data)

    if data is not None:
        username = data.get("username")
        password = data.get("password")
        interests=data.get("interests")
        if username is not None and password is not None:
            # Store the username and password in Firebase Realtime Database

            interests_list = json.dumps(interests)

            user_data = {
                "username": username,
                "password": password,
                "interests": interests_list,

            }

            new_user_ref = root_ref.child("users").push(user_data)
            uid = new_user_ref.key  # Retrieve the generated UID
            print(uid)
            return "success"


    return "Invalid data format"

@app.route("/home", methods=['GET','POST'])

def home_page():

    # tweet_data = request.get_json()
    # print(tweet_data)
   
    # return "Invalid UID parameter."
    tweet_data = request.json
    print(tweet_data)
    
    if tweet_data is not None:
        tweet = tweet_data.get("tweet")
        
        if tweet is not None:
            # Store the tweet data in the specific user's node
            tweet_ref = root_ref.child("users").child("tweets").push(tweet)
            tweet_id = tweet_ref.key  # Retrieve the generated tweet ID
            print(tweet_id)
            
            return "Tweet stored successfully."

    return "Invalid data format."

@app.route("/filteredTweets", methods=['GET','POST'])
def filteretedTweets():

    API_URL="https://api-inference.huggingface.co/models/cross-encoder/nli-deberta-base"
    #API_URL="https://api-inference.huggingface.co/models/facebook/bart-large-mnli"

    headers={"Authorization":"Bearer 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"}

    def query(payload):
        response=requests.post(API_URL,headers=headers,json=payload)
        return response.json()
    

    sentences = [
    "I enjoyed the music concert last night.",
    "The educational conference was informative.",
    "The new technology gadget is impressive.",
     "The live music performance was incredible.",
    "I learned a lot from the educational workshop.",
    "The latest technology trends are fascinating.",
    "I enjoy playing musical instruments.",
    "The educational system needs improvement.",
    "New technological advancements are changing the world.",
    "I love attending music festivals.",
    "Quality education is crucial for personal growth.",
    "The technology industry is constantly evolving.",
    "Music has a powerful impact on emotions.",
    "Education is the key to a better future.",
    "Artificial intelligence is revolutionizing technology.",
    "I listen to music every day.",
    "Continuous learning is important in today's world.",
    "The latest gadgets are innovative and efficient.",
    "I'm passionate about music and technology.",
    "Access to education should be available for everyone.",
    "Emerging technologies are shaping our society.",
    "I enjoy exploring different music genres.",
    "Education plays a vital role in societal development.",
    "Technological advancements have transformed various industries.",
    "Music has the power to bring people together.",
    "Quality education empowers individuals to succeed.",
   
    ]

    interests = ["music", "education", "technology"]
    result_threshold = 0.7

    filtered_sentences = []

    for sentence in sentences:
        payload = {
            "sequence": sentence,
            "labels": interests,
            "candidate_labels": interests 
        }

        result = query(payload)
        print(result)

        if 'scores' in result and max(result['scores']) > result_threshold:
            filtered_sentences.append(sentence)
        print(filtered_sentences)

    return {"filtered_sentences": filtered_sentences}

if __name__=="__main__":
    app.run(debug=False)







