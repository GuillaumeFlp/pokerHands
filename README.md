# Poker Hands

The project consists of comparing several pairs of poker hands and indicating which one has the highest rank

## Rules

https://codingdojo.org/kata/PokerHands/

## Build docker container

docker build . -t poker-hands --no-cache --network=host

## Run docker container

docker run -p 8080:8080 -d poker-hands
