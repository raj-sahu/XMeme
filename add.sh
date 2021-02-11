curl --location --request POST "http://127.0.0.1:8000/memes/"  --header  "Content-Type: application/json" --data-raw "{\"name\":\"Ashok kumar\",\"caption\":\"This is a meme\",\"url\":\"https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg\"}"
printf "\n\n                                       ________            \n\n "
curl --location --request POST "http://127.0.0.1:8000/memes/" \
--header 'Content-Type: application/json' \
--data-raw "{\"name\": \"ashok kumar\",\"caption\": \"This is a meme\",\"url\": \"https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg\"}"
printf "\n\n                                         FINISHED                      \n"
