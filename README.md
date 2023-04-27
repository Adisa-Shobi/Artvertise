# Artvertise

![Banner Image](https://imgur.com/JybHihN)

### Introduction

The "Art work Auction App" is an online platform that aims to provide an online auction management system for buying and selling artwork. The homepage displays all the latest products in chronological order with details such as product name, description, starting bid amount, and incremental value. Only authenticated users can participate in selling or bidding, and only registered and authenticated sellers can place their products for bidding. The system keeps records of all bids and bid history. An administrator manages the system and can track auctions, authenticate users and products, and communicate transaction details and shipping modes to sellers and bidders.

### Problem Statement

The conventional auction house system has inherent problems, and there is a need for an online auction management system that can provide a better experience for both buyers and sellers. The problem is that the existing system is not user-friendly and is limited in scope, making it difficult for users to navigate through the products and participate in the auctions. The proposed solution is to develop a web portal that can provide a seamless and efficient platform for buyers and sellers to interact and transact. The system will allow users to sign up, browse through products by category, and place bids on products they are interested in. The web portal will also have an administrator who can manage the system and authenticate users and products.

![Banner Image](https://imgur.com/wdrpLsf)

### Development Architecture

Frontend- React, Redux, HTML, CSS, Javascript
Backend (API): Node js-Express
Backend (Database)- MongoDB
Thrid Party API - Stripe API

#### Backend (API)

A. Authentication-
Allow the user to authenticate to App
/login/username/ POST

B. bid_offers (GET)
List bids all bid/auction.
/{token}/bid_offers GET
/{token}/bid_offers?since={timestamp} GET

C. Bid_offer (GET)
Show a particular bid offer
/{token}/bid_offer/{id} GET

D. bid_offer (POST)
Submit a response against a particular bid offer for this.
/{token}/bid_offer/{id} POST

E. bid_withdraw (POST)
Withdraw a response against a particular bid offer.
/{token}/withdraw/{uuid} POST
